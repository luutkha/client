import globalAxios from "../configs/axios/axios";

export const isEmailRegisted = async (email:string) => {
    
    try {
      const resp = await  globalAxios.post('http://localhost:3000/v1/users/check?email='+email)
     
    } catch (error) {
     
    }

  }