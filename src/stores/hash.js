import { defineStore } from 'pinia'
import {ref} from 'vue'
import axios from 'axios'
import CryptoJS from 'crypto-js'

// import parsedData from '@/assets/group_members.json'
// import parsedData from '@/assets/mock.json'
// import parsedData from '@/assets/mock_me.json'
const ready = ref(false)
let readyData = ref(null);
let hash = ref(new Map());

export const useHashStore = defineStore('hashStore', () => {

  const initHash = async () => {
    try{
      const res = await axios.get("https://raw.githubusercontent.com/mmnvb/network/main/src/assets/encrypted_data.json")

      if(res && res.status == 200){
        const decryptedBytes = CryptoJS.AES.decrypt(res.data, import.meta.env.VITE_APP_KEY);
        const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

        readyData.value = Object.entries(decryptedData).map(x=>x[1])
      }
      generateHash()
      ready.value = true
    }
    catch(err){
      console.error(err)
    }
  }

  const generateHash = () => {
    for (let i = 0; i<readyData.value.length;i++){
        for (let e = 0; e<readyData.value[i].length; e++){
            let val = hash.value.get(readyData.value[i][e]) || []
            val.push(i)

            hash.value.set(readyData.value[i][e], val)
        }
    }
    console.log('generated')
  }

  initHash()

  return { hash, readyData, ready}
})
