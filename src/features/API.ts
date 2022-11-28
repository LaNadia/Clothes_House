import axios from 'axios';

   export const clothesTrending = async (func: Function) => {
     
     try{
        func(true);
        const data =  await (await axios.get('https://fakestoreapi.com/products?limit=6')).data;
        func(false);
        return data;    
     } catch(error) {
          console.log('error', error)
     };
   }

   export const instPics= async (func: Function) => {
     try{
        const data = [];
        func(true);

        for(let i = 0; i < 5; i++){
            let pic =  await (fetch(`https://loremflickr.com/320/240/jewellery?${i}`));
            data.push(pic);
        };
        func(false);

        return data;
     } catch (error){
          console.log('error', error)
     }
    }
      
   export const journalStory = async (func: Function)  => {
     try{
        func(true);
        const data = [];

        const story =  await (await axios.get('https://shortstories-api.herokuapp.com/')).data;
               
        data.push(story)

        let pic =  await (fetch(`https://loremflickr.com/320/240`));
        data.push(pic);

        func(false);
        return data;
     } catch (error){
          console.log('error', error)
     }
   }
         
   export const journalStories = async (func: Function)  => {
     try{
          func(true);

               const data =  await (await axios.get('https://shortstories-api.herokuapp.com/stories')).data;
               
          func(false);

          return data;
     } catch (error){
          console.log('error', error)
}
   }

   export const getPic = async (next: any) => {
     try{
          await (fetch(`https://loremflickr.com/320/240/jewellery?`)
               .then(res=> next.push(res)));
                        
          return await next;
     } catch (error){
          console.log('error', error)
     }
   }

   export const getPicForRelated  = async (list: any) => {
     try{ 
        for(let i = 0; i< 3; i++){
                await (fetch(`https://loremflickr.com/320/240/jewellery?${i}`)
                        .then(res => list.push(res.url)));               
          };
     } catch (error){
          console.log('error', error)
     }
}
