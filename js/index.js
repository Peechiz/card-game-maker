let store = firebase.storage();

let app = new Vue({
  el: '#app',
  data: {

    // new card
    title: '',
    text: '',
    img: {
      preview: '',
      blob: null,
      name: '',
      path: ''
    },
  },
  created: function () {
    decksRef.once('value').then((res) => {
      let currDecks = res.val()
      this.decks = Object.keys(currDecks).map(key => {
        return {
          name: currDecks[key].name,
          ref: key
        }
      })
    }, function (err) {
      console.err(err)
    })
  },
  methods: {
    submit() {
      console.log('add card')
      // console.log(this.selectedDeck.ref)
      // console.log(this.img)

      let imgStore = store.ref('/cards/' + this.img.name);
      let upload = imgStore.put(this.img.blob);

      upload.then(res => {
        console.log(res)
        this.img.path = res.metadata.name;

        let newCard = cardsRef.push()
        newCard.set({
          title: this.title,
          text: this.text,
          img: this.img.path,
        })
        console.log('card added!')
        this.clear();

      }).catch(err => {
        console.log(err);
      })

      
    
    },
    imgHandle(e) {
      const input = e.target;
      let file = input.files[0]
      if (input.files && file) {
        let preview = new FileReader();
        let payload = new FileReader();
        preview.onload = e => {
          this.img.preview = e.target.result;
        }
        preview.readAsDataURL(file);
        payload.onloadend = e => {
           this.img.blob = new Blob([e.target.result], {type: "image/jpeg"})
           this.img.name = file.name
        }
        payload.readAsArrayBuffer(file);
      }
    },
    // newDeck(name) {
    //   console.log('add deck:', name)

    //   let newDeckRef = decksRef.push()
    //   newDeckRef.set({
    //     name
    //   })

    //   this.selectedDeck = name;
    //   this.decks.push(name)
    //   this.deckToAdd = '';
    //   this.toggleAdding();
    // },
    clear() {
      this.title= '';
      this.text= '';

      this.$set(this.img, 'preview', '');
      this.img.blob='';
      this.img.path='';
      this.img.name='';

      // TODO reset
      this.$refs.fileUpload.value = '';
    }
  }
})