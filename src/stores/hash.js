import { defineStore } from 'pinia'
import {ref} from 'vue'
import axios from 'axios'

import parsedData from '@/assets/group_members.json'
// import parsedData from '@/assets/mock.json'
// import parsedData from '@/assets/mock_me.json'

let readyData;
let hash = new Map();
const loader = ref(true)


export const useHashStore = defineStore('hashStore', () => {
  readyData = Object.entries(parsedData).map(x=>x[1])

  const initHash = async () => {
    try{
      const res = await axios.get("https://drive.usercontent.google.com/uc?id=1jH2V0Ppc6qx15gZsJrOK4SeF_VmRCDWk&export=download")
      console.log(res)
      generateHash()
    } catch(err){
      console.error(err)
    }
    finally{
      loader.value = false
    }
  }

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

  initHash()

  return { hash, readyData }
})
