<script lang="ts">
  import katex from 'katex';

  let output = $state("");
  //let expression = $state("3+7+\\frac{3}{4}");
  let expression = $state("3\\frac{(x+4)^{2/3}\\cdot3\\cdot\\sqrt[3]{x+4}+2x}{3\\sqrt[3]{x+4}}");
  let steps = $state([]);

  async function compute() {
    const response = await fetch("http://localhost:8000/api/simplify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ str_exp: expression }),
    });

    const data = await response.json();
    output = data.latex;

    steps = data.steps.filter((step: any) => step.operation !== step.result);
  }

  let expressionHtml = $derived.by(() => renderKatex(expression));

  function renderKatex(str: string) {
    return katex.renderToString(str, {
      throwOnError: false,
    });
  }
</script>

<div>
  <div class="container sm:w-full mx-0 sm:mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Form -->
      <form action="#" class="form">
        <div class="field">
          <label for="expression" class="white">Expression</label>
          <input type="text" id="expression" bind:value={expression} />

          <div class="p-4 bg-white rounded my-2 text-xl">
            {@html expressionHtml}
          </div>
        <div class="field">
          <button class="view-button" type="button" onclick={compute}>Compute</button>
        </div>
      </form>
    </div>
  </div>

  <div class="container mx-auto px-4 md:px-0 mt-8">
    <div class="bg-white p-4 rounded">
      <h2 class="text-xl font-bold mb-2">Solution</h2>
      <div class="text-2xl">
        {@html renderKatex(output)}
      </div>

      <ul>
        {#each steps as step, i}
          <li class="list-inside list-decimal my-2">
            {@html renderKatex(step.operation)} => {@html renderKatex(step.result)}
          </li>
        {/each}
      </ul>
    </div>
  </div>

  
</div>
