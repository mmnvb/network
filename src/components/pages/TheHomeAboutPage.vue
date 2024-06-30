<script setup>
import { Button } from '@/components/ui/button'
import IconGithub from '../icons/IconGithub.vue';
import IconTelegram from '../icons/IconTelegram.vue';

import TheHomeAboutAccordion from "@/components/TheHomeAboutAccordion.vue"
</script>

<template>
  <section
    class="w-full flex flex-col justify-around items-center gap-8 mt-8"
    id="about"
  >
    <h2 class="text-4xl lg:text-5xl">
      About
    </h2>
    <!-- content div -->
    <div class="flex flex-col lg:flex-row w-4/5 lg:w-3/4 gap-8 lg:gap-0 lg:h-96 justify-around mt-3">
      <!-- first part -->
      <div class="flex flex-col lg:h-3/5 justify-between w-full lg:w-1/2 gap-12 lg:gap-0">
        <div class="flex flex-col gap-8">
          <h3 class="text-3xl lg:text-4xl">
            Who built this project?
          </h3>

          <p class="text-xl lg:text-2xl">
            My name is Bobomurod. I'm a BIS student and passionate 
            about technology and a real world application
            of it.
          </p>
        </div>

        <div class="self-center lg:self-start">
          <a
            href="https://github.com/mmnvb"
            target="_blank"
          >
            <Button class="rounded-full mr-3">
              <IconGithub class="mr-2" />
              Github
            </Button>
          </a>
          <a
            href="https://t.me/muminovbob"
            target="_blank"
          >
            <Button class="rounded-full">
              <IconTelegram class="mr-2" />
              Telegram
            </Button>
          </a>
        </div>
      </div>

      <!-- second part -->
      <div class="w-full lg:w-2/5">
        <TheHomeAboutAccordion />
      </div>
    </div>
  </section>
</template>