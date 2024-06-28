import { defineStore } from 'pinia'

import parsedData from '@/assets/group_members.json'
// import parsedData from '@/assets/mock.json'
// import parsedData from '@/assets/mock_me.json'

let readyData;
let hash = new Map();

export const useHashStore = defineStore('hashStore', () => {
  readyData = Object.entries(parsedData).map(x=>x[1])

  const generateHash = () => {
    for (let i = 0; i<readyData.length;i++){
        for (let e = 0; e<readyData[i].length; e++){
            let val = hash.get(readyData[i][e]) || []
            val.push(i)

            hash.set(readyData[i][e], val)
        }
    }
    console.log('generated')
  }

  generateHash()

  return { hash, readyData }
})
