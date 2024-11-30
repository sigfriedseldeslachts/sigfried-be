export interface ITool {
  title: string
  description: string
  route: string|null
}

const tools: ITool[] = [
  {
    title: 'VLSM Calculator',
    description: 'A VLSM Calculator for IPv4. Simply enter the network and the required subnet sizes and press calculate. This assumes the network is empty, it will sort the subnets by size!',
    route: '/tools/vlsm'
  }
];

export default tools;
