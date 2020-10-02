export function niceDate(date) {
       var d = new Date(date)
       var nd = d.getFullYear()  + '-' + 
           (((d.getMonth() + 1) < 10) ? ("0" + (d.getMonth() + 1)) : (d.getMonth() + 1)) + '-' +
           ((d.getDate() < 10) ? ("0" + d.getDate()) : (d.getDate()))
       return nd
}

export function getDataStr(state) {                 
       const obj = {
         type: undefined,                               //тип потребителя 0 === дом, 1 === завод
         indx: undefined,                               //порядковый номер потребителя в группе
         dtst: -1                                       //номер строки в массиве consumptions
       }
       let arr = []
       arr = state.data.houses.map((h) => {
         return h.Name})
       if (arr.indexOf(state.selectedConsumer) > -1) {
         obj.type = 0
         obj.indx = arr.indexOf(state.selectedConsumer)
         obj.dtst = state.data.houses[obj.indx].consumptions.map((dt) => {
           return(niceDate(dt.Date))}).indexOf(state.selectedDate)
       } else {
         arr = state.data.plants.map((p) => {
           return p.Name})
           if (arr.indexOf(state.selectedConsumer) > -1) {
             obj.type = 1
             obj.indx = arr.indexOf(state.selectedConsumer)
             obj.dtst = state.data.plants[obj.indx].consumptions.map((dt) => {
               return(niceDate(dt.Date))}).indexOf(state.selectedDate)
         }
       }       
     return obj
     }