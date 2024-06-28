import { defineStore } from 'pinia'
import {ref} from 'vue'
import axios from 'axios'

// import parsedData from '@/assets/group_members.json'
// import parsedData from '@/assets/mock.json'
// import parsedData from '@/assets/mock_me.json'

let readyData;
let hash = new Map();
const loader = ref(true)

export const useHashStore = defineStore('hashStore', () => {
  const initHash = async () => {
    try{
      const res = await axios.get("https://raw.githubusercontent.com/mmnvb/network/main/src/assets/group_members.json")

      if(res && res.status == 200){
        readyData = Object.entries(res.data).map(x=>x[1])
      }
      generateHash()
    }
    catch(err){
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
