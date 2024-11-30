<script>
  import calculateVLSM from '../../scripts/vlsm.js';

  let addressBlock = $state('216.16.217.0/24');
  let hosts = $state([55,31,19,15,11,4,2,2,2]);
  let result = $state({
    networkAddress: '',
    networkMask: 0,
    subnets: [],
    details: null,
  });

  function addHost() {
    hosts.push(0);
  }

  function calculate() {
    hosts = hosts.filter(host => host > 0); // Remove empty hosts
    hosts = hosts.sort((a, b) => b - a); // Sort hosts in descending order
    
    try {
      result = calculateVLSM(addressBlock, hosts);
    } catch (error) {
      let msg = 'Something went wrong.';
      if (typeof error === 'string') {
        msg = error;
      }
      alert(msg);
    }
  }
</script>

<div class="container sm:w-full mx-0 sm:mx-auto">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Form -->
    <form action="#" class="form">
      <div class="field">
        <label for="addressBlockInput" class="white">Address block</label>
          <input type="text" id="addressBlockInput" bind:value={addressBlock}>
      </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-2.5">
        {#each hosts as host, index}
          <div class="field" key="host">
            <label for={`hostInput-${index}`} class="white">Hosts</label>
            <input type="text" id={`hostInput-${index}`} bind:value={hosts[index]}>
          </div>
        {/each}
      </div>
      <div class="field">
        <button class="view-button" type="button" onclick={addHost}>Add network</button>
        <button class="view-button" type="button" onclick={calculate}>Calculate</button>
      </div>
    </form>

    <!-- Results -->
    <div>
      <div class="px-6 py-4 bg-gray-100 rounded-lg shadow-lg">
        <h3 class="text-lg">Details about this address pool</h3>
        {#if result.details}
          <ul class="list-inside list-disc text-gray-700 text-sm">
            <li>Actual network address: { result.networkAddress + '/' + result.networkMask }</li>
            <li>Total addresses available: { result.details.maxAddresses }</li>
            <li>Total addresses required: { result.details.requiredSpace } <small>(with broadcast & network addresses)</small></li>
            <li>Total addresses left: { result.details.addresesLeft }</li>
            <li>Total percentage used: { result.details.percentage }%</li>
          </ul>
        {:else}
          <p class="text-sm text-gray-700">Click the calculate button to show the results.</p>
        {/if}
      </div>
    </div>
  </div>

  <!-- Table -->
  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-8">
    <table id="vlsm-table">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col">Requested size</th>
          <th scope="col">Allocated size</th>
          <th scope="col">CIDR Notation</th>
          <th scope="col">Subnetmask</th>
          <th scope="col">Available range</th>
          <th scope="col">Broadcast address</th>
        </tr>
      </thead>
      <tbody>
        {#each result.subnets as row}
          <tr>
            <td>{ row.requestedSize }</td>
            <td>{ row.allocatedSize }</td>
            <td>{ row.networkAddress }/{ row.networkMask }</td>
            <td>{ row.subnetMask }</td>
            <td>{ row.firstUsable } - { row.lastUsable }</td>
            <td>{ row.broadcastAddr }</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style lang="scss">
#vlsm-table {
  @apply min-w-full divide-y divide-gray-200;

  thead {
    tr {
      th {
        @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
      }
    }
  }

  tbody {
    @apply bg-white divide-y divide-gray-200;

    tr {
      td {
        @apply px-6 py-4 whitespace-nowrap font-medium text-gray-600;
      }
    }
  }
}
</style>