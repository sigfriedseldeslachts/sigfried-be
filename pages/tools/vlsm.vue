<template>
  <div class="component-wrapper">
    <div class="title-section">
      <h1>VLSM Calculator</h1>
    </div>

    <div class="container sm:w-full mx-0 sm:mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Form -->
        <form action="#" @submit.prevent="calculate" class="form">
          <div class="field">
            <label for="addressBlockInput" class="white">Address block</label>
              <input type="text" id="addressBlockInput" v-model="form.addressBlock">
          </div>
          <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            <div class="field" v-for="(tag, index) in form.hosts" :key="tag + '-' + index">
              <label :for="tag + '-' + index" class="white">Network {{ index + 1 }}</label>
              <input type="text" :id="tag + '-' + index" v-model="form.hosts[index]">
            </div>
          </div>
          <div class="field">
            <button class="view-button" type="button" @click.prevent="form.hosts.push(1)">Add network</button>
            <button class="view-button" type="submit">Calculate</button>
          </div>
        </form>

        <!-- Results -->
        <div>
          <div class="px-6 py-4 bg-gray-100 rounded-lg shadow-lg">
            <h3 class="text-lg">Details about this address pool</h3>
            <ul v-if="result.details" class="list-inside list-disc text-gray-700 text-sm">
              <li>Actual network address: {{ result.networkAddress + '/' + result.networkMask }}</li>
              <li>Total addresses available: {{ result.details.maxAddresses }}</li>
              <li>Total addresses required: {{ result.details.requiredSpace }} <small>(with broadcast & network addresses)</small></li>
              <li>Total addresses left: {{ result.details.addresesLeft }}</li>
              <li>Total percentage used: {{ result.details.percentage }}%</li>
            </ul>
            <p v-else class="text-sm text-gray-700">Click the calculate button to show the results.</p>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-4">
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
            <tr v-for="row in result.subnets" :key="row.networkAddress">
              <td>{{ row.requestedSize }}</td>
              <td>{{ row.allocatedSize }}</td>
              <td>{{ row.networkAddress }}/{{ row.networkMask }}</td>
              <td>{{ row.subnetMask }}</td>
              <td>{{ row.firstUsable }} - {{ row.lastUsable }}</td>
              <td>{{ row.broadcastAddr }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import calculateVLSM from '~/plugins/tools/vlsm';

export default {
  name: 'ToolsVlsm',
  data () {
    return {
      form: {
        addressBlock: '216.16.217.0/24',
        hosts: [55,31,19,15,11,4,2,2,2],
      },
      result: {
        subnets: [],
      },
      inputValue: '',
      inputVisible: true,
    }
  },
  methods: {
    calculate () {
      this.filterHosts();

      try {
        this.result = calculateVLSM(this.form.addressBlock, this.form.hosts);
      } catch (error) {
        let msg = 'Something went wrong.';

        if (typeof error === 'string') {
          msg = error;
        }

        alert(msg);
      }
    },
    filterHosts () {
      // If any of the values are empty or less than or equal to 0, remove it
      this.form.hosts = this.form.hosts.filter(v => v !== '' && v > 0);

      // Sort the array
      this.form.hosts.sort((a, b) => b - a);
    }
  }
}
</script>

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
