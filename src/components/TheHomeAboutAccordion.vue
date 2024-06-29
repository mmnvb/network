<script setup>
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const accordionItems = [
  { 
    value: 'item-1',
    title: 'What is it?',
    content: "It's a graph visualization of students. When you click on a student, you can see lines that go towards all the people the selected student studied with. This includes all current students and alumni." 
  },
  { 
    value: 'item-2',
    title: 'What about privacy?',
    content: 'Your data is encrypted. The only way a regular user can access the data is through the website you are currently on. However, if I was able to find this data, then someone else can too.' 
  },
  { 
    value: 'item-3',
    title: 'Where did you find this data?',
    content: "It's none of your business❤️ Enjoy the app" 
  },
];

</script>

<template>
  <Accordion
    type="single"
    class="w-full"
    collapsible
  >
    <AccordionItem
      v-for="item in accordionItems"
      :key="item.value"
      :value="item.value"
    >
      <AccordionTrigger>{{ item.title }}</AccordionTrigger>
      <AccordionContent>
        {{ item.content }}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>