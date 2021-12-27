<template>
  <div class="hero">
    <Navigation />

    <main class="space-y-6">
      <h1 class="text-6xl font-bold text-white">Hello, I'm Sigfried</h1>
      <p class="text-gray-100 text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum at accusamus dicta neque. Minus, nostrum officia! Dolorum, ut suscipit sunt amet sit ipsa officiis recusandae perferendis quam accusamus minus consectetur!</p>

      <div>
        <nuxt-link to="/projects" class="bg-transparent rounded-full font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-gray-100 mr-6 border-2 border-gray-100 hover:text-gray-900">
          My projects
          <svg xmlns="http://www.w3.org/2000/svg" class="inline -mt-0.5 ml-2 w-6 stroke-current stroke-2" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </nuxt-link>
      </div>
    </main>

    <s-footer class="home" />
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
