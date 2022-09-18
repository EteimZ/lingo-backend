import googleTranslateApi from '@vitalets/google-translate-api';

/*
googleTranslateApi('Yo hablo espanol', {to: 'fr'}).then(res => {
    console.log(res.text);
    //=> I speak English
    console.log(res.from.language.iso);
    //=> nl
}).catch(err => {
    console.error(err);
});
*/

async function run() {
  try {
    const res = await googleTranslateApi('I speak spanish', {to: 'fr' , from: 'en'})
    console.log(res.text)
  } catch (err){
      console.error(err);
  }

}

run()
