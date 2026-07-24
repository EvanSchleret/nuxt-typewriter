<template>
    <main>
        <h1>
            <Typewriter
                :texts="['Nuxt Typewriter', 'Characters or words']"
                :typing-speed="70"
                :deleting-speed="35"
                :pause-duration="1000"
                style="words"
            />
        </h1>
    </main>
</template>

<style>
body {
  margin: 0;
  font-family: sans-serif;
}

main {
  display: grid;
  min-height: 100vh;
  place-items: center;
}
</style>
