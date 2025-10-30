export function HotelCard(){
    return(
        <template id="hotelCardTpl">
            <article class="hotel-card">
                <div class="media">
                <img src="" alt="hotel" />
                <div class="rating"></div>
                </div>
                <div class="card-body">
                <h3 class="hotel-name"></h3>
                <p class="hotel-sector"></p>
                <div class="meta">
                    <span class="price"></span>
                    <button class="viewBtn">Ver oferta</button>
                </div>
                </div>
            </article>
        </template>
    )
}