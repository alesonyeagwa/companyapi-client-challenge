import * as $ from "jquery";
export default{
    getErrors(error){
        let message = error
        if(error.response){
            if (error.response.status == 400 ) {
                if(error.response.data?.errors){
                    //validation errors
                    message = ''
                    $.each(error.response.data.errors, function(fieldName, errors){
                        message = `${message}${errors[0] }`
                    });
                }else if(error.response.data){
                    message = ''
                    $.each(error.response.data, function(fieldName, errors){
                        message = `${message}${errors[0] }`
                    });
                }
            }
        }
        return message
    }
}