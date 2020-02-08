new Vue({
    el: '#app',
    data: {
        error: '',
        success: false,
        name:'',
        url:''
    },
    methods: {
        createData(){
            const body = {
                name:this.name,
                url: this.url
            };
            fetch('/api/shorten', {
                method:"POST",
                body: JSON.stringify(body),
                
                headers: {
                    'content-type': "application/json"
                }
                
            }).then(response =>  {
                console.log(response);
                return response.json();
            }).then(result => {
                console.log(result)
                if (result.isJoi){
                    
                    this.error = result.details.map(details => details.message).join(' ');
                    console.log(this.error);
                    

                }
                else{
                    this.success= true; 

                }
            });
            
        }
    }
});