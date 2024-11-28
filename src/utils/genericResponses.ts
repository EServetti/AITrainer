type Resp = {
  statusCode: number;
  message: string | object | any[];
};

function returnReponse(status: number, message: string | object | any[] | null): Resp {
  try {
    switch(status) {
        case 200: 
          return {
            statusCode: 200,
            message: message || "Succes"
          }
        case 201: 
          return {
           statusCode: 201,
           message: message || "Correctly created!"
          }
        case 400: 
          return {
            statusCode: 400,
            message: message || "Bad request"
          }
        case 404: 
          return {
            statusCode: 404,
            message: message || "Not found docs!"
          }
        default: 
          const error = new Error("Tere's none error with that status!")
          throw error
    }
  } catch (error) {
    throw error
  }
}


export default returnReponse;
