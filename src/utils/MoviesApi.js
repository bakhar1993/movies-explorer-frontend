import { BEATFILM_API } from "./constants";

function getMovies(){

return fetch(BEATFILM_API).then((res)=>{
    if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
})

}

export default getMovies;