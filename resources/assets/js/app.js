import 'core-js/es/object/assign';
import Vue from 'vue';
import { populateAmenitiesAndPrices } from './helpers';
import ImageCarousel from '../components/ImageCarousel.vue';

let model = JSON.parse(window.vuebnb_listing_model);
model = populateAmenitiesAndPrices(model);

const app = new Vue({
    el: '#app',
    data: Object.assign(model, {
        headerImgStyle: {
            'background-image': `url(${model.images[0]})`
        },
        contracted: true,
        modalOpen: false
    }),
    watch: {
        modalOpen: () => {
            const className = 'modal-open';
            if (this.modalOpen) document.body.classList.add(className)
            else document.body.classList.remove(className)
        }
    },
    created: () => {
        document.addEventListener('keyup', escapeKeyListener)
    },
    destroyed: () => {
        document.removeEventListener('keyup', escapeKeyListener)
    },
    components: {
        ImageCarousel
    }
})

function escapeKeyListener(event) {
    if (event.keyCode == 27 && app.modalOpen) {
        app.modalOpen = false
    }
}
