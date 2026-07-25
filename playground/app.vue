<template>
    <main>
        <h1>
            <Typewriter
                :texts="[
                    'Nuxt Typewriter',
                    'Characters or words',
                    'TailwindCSS classes compatible',
                    'Custom typing and deleting speeds',
                    'Pause duration between texts',
                    'Looping through texts',
                    'Custom cursor',
                    'Easy to use and integrate',
                    'Lightweight and performant'
                ]"
                :typing-speed="70"
                :deleting-speed="35"
                :pause-duration="1000"
                :blink-cursor="{ when: 'end' }"
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
