let s1, s2, s3, s4;

/**
 * Create an array of x bits with the given default value
 */
const createArrayWithSize = (size, value = 0) => {
  return Array.from({ length: size }, (x) => value);
}

const binaryToInt = (bin) => {
  // If we get an Array represtenstation we will make it a string
  if (Array.isArray)
    bin = bin.join('');

  return parseInt(bin, 2);
}

const intToBinary = (dec) => {
  return (dec >>> 0).toString(2);
}

/**
 *
 * @param {int} num
 */
const removeLeadingZeros = (num) => {
  return parseInt(num, 10);
}

/**
 * Converts an integer to an eight bit binary array
 */
const intToEightBitBinaryArray = (dec) => {
  // Get the binary value turn it into an array and reverse it
  const bin = intToBinary(dec).split('').reverse();

  // Create an empty array of eight bits
  let a = createArrayWithSize(8);

  bin.forEach((item, index) => {
    // We need to work backwards
    a[7 - index] = parseInt(item);
  });

  return a;
}

const binaryArrayToString = (bin) => {
  return bin.join('');
}

/**
 * Splits 192.168.1.0/24 into 192.168.1.0 & 24
 */
const splitCidrNotation = (cidrAddress) => {
  return cidrAddress.split('/');
}

/**
 * Splits the subnets in 4 arrays (1 array = an octet)
 *
 * @param {Array} octets
 */
const calculateNetmaskAsArray = (addr, cidrMask) => {
  if (!Array.isArray(addr) || addr.length != 4)
    throw "You must provide an array with four octets";

    let subnet = createArrayWithSize(32);

    for (let i = 0; i < cidrMask; i++) {
      subnet[i] = 1;
    }

    s1 = subnet.slice(0,8);
    s2 = subnet.slice(8,16);
    s3 = subnet.slice(16,24);
    s4 = subnet.slice(24);

    return [s1, s2, s3, s4];
}

/**
 * Calculates the netmask address from a decimal mask to a decimal dot mask
 *
 * @param {int} mask
 */
const calculateDecimalDotNetmask = (mask) => {
  let a = createArrayWithSize(32);

  for (let i = 0; i < mask; i++) {
    a[i] = 1;
  }

  // Now convert each octet to an int and place it into a string
  return `${binaryToInt(a.slice(0,8))}.${binaryToInt(a.slice(8,16))}.${binaryToInt(a.slice(16,24))}.${binaryToInt(a.slice(24,32))}`;
}

/**
 * Calculates the REAL network address
 *
 * @param {Array} octets
 */
const calculateNetworkAddress = (ipAddr, octets) => {
  if (!Array.isArray(octets) || octets.length != 4)
    throw "You must provide an array with four octets";

  let result = [];

  octets.forEach((item, index) => {
    // Binary AND
    result[index] = ipAddr[index] & binaryToInt(item);
  });

  return result;
}

/**
 * Calculates the max HOSTS in an subnet
 * 2^(32-MASK) - 2 (-2 because network and broadcast addr)
 *
 * @param {int} mask
 */
const calculateMaxHostsInSubnet = (mask) => {
  return Math.pow(2, (32 - mask)) - 2;
}

/**
 * Merges multiple arrays into a single one
 *
 * @param {Array} octets
 */
const completeAddrToArray = (octets) => {
  if (!Array.isArray(octets) || octets.length != 4)
    throw "You must provide an array with four octets";

  let result = [];

  octets.forEach((item) => {
    result = result.concat(item);
  });

  return result;
}

/**
 *
 * @param {Array} ipAddr
 */
const completeArrayToAddr = (ipAddr) => {
  if (!Array.isArray(ipAddr) || ipAddr.length != 32)
    throw "You must provide an array with 32 bits";

  let result = "";

  //
  for (let i = 0; i <= 24; i += 8) {
    const octet = binaryToInt(ipAddr.slice(i, i + 8))

    result += octet + (i !== 24 ? '.' : ''); // if not 24 add a dot
  }

  return result;
}

/**
 * Get the first usable address
 * Provide a network
 *
 * @param {*} ipAddr
 * @param {int} mask
 */
const getFirstUsableAddr = (ipAddr) => {
  ipAddr[ipAddr.length - 1] = 1;

  return completeArrayToAddr(ipAddr);
}

/**
 *
 * @param {*} ipAddr
 * @param {int} mask
 */
const getLastUsableAddr = (ipAddr, mask) => {
  for (let i = mask; i < 31; i++) {

    ipAddr[i] = 1;
  }

  // Last bit must be a zero
  ipAddr[31] = 0;

  return completeArrayToAddr(ipAddr);
}

/**
 *
 * @param {*} ipAddr
 * @param {int} mask
 */
const getBroadcastAddr = (ipAddr, mask) => {
  for (let i = mask; i < 32; i++) {
    ipAddr[i] = 1;
  }

  return completeArrayToAddr(ipAddr);
}

/**
 *
 * @param {Array} ipAddr
 */
const addressFromArrayToString = (ipAddr) => {
  if (!Array.isArray(ipAddr) || ipAddr.length != 4)
    throw "You must provide an array with 4 octets";

  return removeLeadingZeros(ipAddr[0]) + "." + removeLeadingZeros(ipAddr[1]) + "." + removeLeadingZeros(ipAddr[2]) + "." + removeLeadingZeros(ipAddr[3]);
}


const calculateDetails = (hosts, networkAddr, cidrMask, ipArray) => {
  // Calculate max available addresses in network
  const maxAddresses = Math.pow(2, (32 - cidrMask));

  // Calculate needed space for the subnets
  const requiredSpace = hosts.reduce((a, b) => { return a + b.requestedSize + 2 }, 0);

  if (requiredSpace > maxAddresses) {
    throw 'You require more addresses than there are available.';
  }

  // Calculate actual addresses used
  const actualAddressesUsed = hosts.reduce((a, b) => {
    return a + b.allocatedSize + 2;
  }, 0);

  // Calc addresses left
  const addresesLeft = maxAddresses - actualAddressesUsed;

  // Calc percentage
  const percentage = Math.round((actualAddressesUsed / maxAddresses) * 100);

  return {
    maxAddresses,
    requiredSpace,
    addresesLeft,
    percentage
  }
}

/**
 *
 * @param {Array} hosts
 * @param {Array} networkAddr
 * @param {Array} cidrMask
 */
const calculateSubnets = (hosts, networkAddr, cidrMask, ipAddr) => {
  let subnets = [];

  for (let count = 0; count < hosts.length; count++) {

    const compare1 = networkAddr[3] + (Math.pow(2, (32 - cidrMask)) - 1);
    const compare2 = networkAddr[2] + (Math.pow(2, (24 - cidrMask)) - 1);
    const compare3 = networkAddr[1] + (Math.pow(2, (16 - cidrMask)) - 1);

    var stopcheck = 0;  //performs a similar function as the stopexec variable.

    if (stopcheck == 0) {
      if (cidrMask > 24) {
        if (ipAddr[3] > compare1) {
          throw "Your Address Block is not large enough to handle this many host addresses.";
        }
      }
    } //end stopcheck if statement.

    if (stopcheck == 0) {
      if (cidrMask > 16 && cidrMask < 25) {
        if (ipAddr[2] > compare2) {
          throw "Your Address Block is not large enough to handle this many host addresses.";
        }
      }
    } //end stopcheck if statement.

    if (stopcheck == 0) {
      if (cidrMask > 8 && cidrMask < 17) {
        if (ipAddr[1] > compare3) {
          throw "Your Address Block is not large enough to handle this many host addresses.";
        }
      }
    } //end stopcheck if statement.

    var addnum, n, mask, netadd;  //creates needed variables.
    n = hosts[count];

    //the next for loop figures out what the mask should be based on the number of addresses needed and figures out what the next address to use should be.
    var maskVar = 30;  //sets a variable to be used as the mask value.
    for (var count3 = 1; count3 < 28; count3++) {
      if (n > Math.pow(2, count3) - 2) {  //checks to see if the current mask value is sufficient to meet the current network's requirements.
        mask = maskVar;

        addnum = Math.pow(2, (count3 + 1));  //figures out how much to add to the address to get the next network address.
      }
      maskVar = maskVar - 1;  //drops the mask value by one for the next time through the loop.
    }

    let networkAddress = addressFromArrayToString(ipAddr);
    let networkAddrBin = [
      intToEightBitBinaryArray(ipAddr[0]), intToEightBitBinaryArray(ipAddr[1]),
      intToEightBitBinaryArray(ipAddr[2]), intToEightBitBinaryArray(ipAddr[3])
    ];

    const completeAddr = completeAddrToArray(networkAddrBin);

    subnets.push({
      requestedSize: n,
      allocatedSize: calculateMaxHostsInSubnet(mask),
      networkAddress,
      networkMask: mask,
      subnetMask: calculateDecimalDotNetmask(mask),
      firstUsable: getFirstUsableAddr(completeAddr),
      lastUsable: getLastUsableAddr(completeAddr, mask),
      broadcastAddr: getBroadcastAddr(completeAddr, mask)
    });

    ipAddr[3] = ipAddr[3] + addnum;  // adds the value of the addnum variable to the fourth (decimal) octet of the IP address.

    // these next 3 while loops will "carry the 1" so to speak if an octet grows larger than 255.
    while (ipAddr[3] > 255) {
      console.log(ipAddr);

      ipAddr[2]++;
      ipAddr[3] = ipAddr[3] - 256;
    }

    while (ipAddr[2] > 255) {
      console.log(ipAddr);

      ipAddr[1]++;
      ipAddr[2] = ipAddr[2] - 256;
    }

    while (ipAddr[1] > 255) {
      ipAddr[0]++;
      ipAddr[1] = ipAddr[1] - 256;
    }

    //this next if statment just provides protection against the first octet of the IP address going over 255. This situation is very unlikely to ever happen, but I put the statement in just in case.
    if (ipAddr[0] > 255) {
      throw "Fatal Error: IP address is too large. It may be because your Address Block is too small to handle the number of addresses required.";
    }
  }

  return subnets;
}

/**
 * The calculation function
 *
 * @param {*} addressBlock
 * @param {*} hosts
 */
const calculateVLSM = (addressBlock, hosts) => {
  /**
   * Sort the hosts
   */
  hosts = hosts.map((item) => {
    return parseInt(item, 10);
  }).sort(function(a, b){return b-a});

  // Split CIDR address into mask and address
  const splittedCidr = splitCidrNotation(addressBlock);
  const cidrAddr = splittedCidr[0];
  const cidrMask = parseInt(splittedCidr[1]);

  // Split the address in to each octet
  const ipArray = cidrAddr.split('.').map(x => parseInt(x));

  // Calculates the netmask
  const netmaskArray = calculateNetmaskAsArray([s1, s2, s3, s4], cidrMask);

  // Calculate the actual network address of the address block
  const networkAddr = calculateNetworkAddress(ipArray, netmaskArray);

  // MAKE THE SUBNETS!
  const subnets = calculateSubnets(hosts, networkAddr, cidrMask, ipArray);

  // Calculate some details
  const details = calculateDetails(subnets, networkAddr, cidrMask, ipArray);

  return {
    networkAddress: addressFromArrayToString(networkAddr),
    networkMask: cidrMask,
    subnets,
    details
  };
}

export default calculateVLSM;