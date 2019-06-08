    var model = {
        currentCat: null,
        cats: [
            {
                name: 'Finny',
                image: 'img/Finny.jpeg',
                clickCounter: 0
            },
            {
                name: 'Kitty',
                image: 'img/Kitty.jpeg',
                clickCounter: 0
            },
            {
                name: 'Lilly',
                image: 'img/Lilly.jpeg',
                clickCounter: 0
            },
            {
                name: 'Mitty',
                image: 'img/Mitty.jpeg',
                clickCounter: 0
            },
            {
                name: 'Zizzy',
                image: 'img/Zizzy.jpeg',
                clickCounter: 0
            }
        ]
    }


    var octopus= {
        init: function(){
            model.currentCat = model.cats[0];
            catListView.render();
            catView.init()
            adminView.init()
        },

        getCats: function(){
            return model.cats
        },

        setCurrentCat: function(cat){
            model.currentCat = cat
        },
        getCurrentCat: function(){
            return model.currentCat
        },
        incrementCounter: function(){
            model.currentCat.clickCounter ++
            catView.render();
            adminView.init();
        }

    }



    var catListView = {
        render: function(){
            var cat, listItem; 
            this.catList = document.querySelector('.list')
            var cats = octopus.getCats()
            this.catList.innerHTML = '';
            for (var i = 0; i< cats.length; i++){
                cat = cats[i]  
                listItem = document.createElement('li');
                listItem.textContent= cat.name;
                this.catList.appendChild(listItem);

                listItem.addEventListener('click', function(catCopy){
                    return function(){
                        octopus.setCurrentCat(catCopy);
                        catView.render();
                        adminView.init()
                    }
                }(cat))
            }
            
        }
    }

    var catView = {
        init: function(){
            this.catNameElem = document.getElementById('name');
            this.catImageElem = document.getElementById('img');
            this.countElem = document.getElementById('number');
            this.catImageElem.addEventListener('click', function(){
                octopus.incrementCounter()
            })
            this.render();
        },
        render: function(){
            var cat = octopus.getCurrentCat()
            this.catNameElem.textContent = cat.name;
            this.catImageElem.src= cat.image;
            this.countElem.textContent = cat.clickCounter;
            adminView.init()
        }
        
    }

    var adminView = {
        init: function(){
            var form = document.querySelector('.admin-form')

            var adminBtn = document.getElementById('admin');
            var formHidden = true;

            // why classList.toggle doesn't work !!!!
            adminBtn.addEventListener('click', function(){
              if (formHidden){
                  form.classList.add('show');
                  formHidden = false;
              } else {
                  form.classList.remove('show');
                  formHidden = true;
              }
            })
         
            //i wrote this so that if (name or image or clickcounter ) haven't changed it will take the old value
            var cat = octopus.getCurrentCat();
            form.name.value = cat.name;
            form.image.value = cat.image;
            form.counter.value = cat.clickCounter;


            form.onsubmit = function(e){
                e.preventDefault()
                
                cat.name = form.name.value;
                cat.image= form.image.value;
                cat.clickCounter = form.counter.value 

                octopus.setCurrentCat(cat)
                catView.render()


                form.name.placeholder = cat.name;
                form.image.placeholder= cat.image;
                form.counter.placeholder= cat.clickCounter
            }
        }
    }

    octopus.init()

  