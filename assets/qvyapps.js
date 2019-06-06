(function(){
    var qvYappsScripts = function($){
        var yqv = {
            yqvModalTemplate: `<div id="yqv-modal" class="modal">
                          <div class="modal-content">
<!-- <div class="modal-header">
//       <span class="close">&times;</span>
//       <h2>Modal Header</h2>
//     </div>
//     <div class="modal-body">
//       <p>Some text in the Modal Body</p>
//       <p>Some other text...</p>
//     </div> -->
<div class="yqv-modal-close">&times;</div><div class='clearboth'></div>
                            <div class='left-container prod-containers'></div>
                            <div class='right-container prod-containers'>
								
                            </div>
                            <div class='clearboth'></div>
                            <div class="modal-footer" style='display: block !important;'>
                              <h3 style='display: block !important;margin-top: 30px;font-size: 0.8em;'>Powered by YAPPS</h3>
                            </div>
                          </div>
						</div>`,
            yqvModalTriggerButton:`<button class="qv-trigger-btn" style="z-index:100001;position: absolute;top: 50%;left: 50%;margin-right: -50%;transform: translate(-50%, -50%); display:none;    padding: 5px 10px; border-radius: 3px;" id="qv-trigger-btn">Quick View</button>`,
            yqvModalStyles: function(config) {

                var yqvStyle = `
		
        /* The Modal (background) */
        .modal {
          display: none; /* Hidden by default */
          position: fixed; /* Stay in place */
          z-index: 10001; /* Sit on top */
          padding-top: 100px; /* Location of the box */
          left: 0;
          top: 0;
          width: 100%; /* Full width */
          height: 100%; /* Full height */
          overflow: auto; /* Enable scroll if needed */
          background-color: rgb(0,0,0); /* Fallback color */
          background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
          font-family: ${config.fontFamily};
        }

        /* Modal Content */
        .modal-content {
          position: relative;
          background-color: #fefefe;
          margin: auto;
          padding: 0;
          border: 1px solid #888;
          width: 80%;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
          -webkit-animation-name: animatetop;
          -webkit-animation-duration: 0.4s;
          animation-name: animatetop;
          animation-duration: 0.4s;
    	padding: 30px;
        }

        /* Add Animation */
        @-webkit-keyframes animatetop {
          from {top:-300px; opacity:0} 
          to {top:0; opacity:1}
        }

        @keyframes animatetop {
          from {top:-300px; opacity:0}
          to {top:0; opacity:1}
        }

        /* The Close Button */
        .yqv-modal-close {
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .yqv-modal-close:hover,
        .yqv-modal-close:focus {
          color: #000;
          text-decoration: none;
          cursor: pointer;
        }

        .modal-header {
          padding: 2px 16px;
          color: white;
        }

        .modal-body {padding: 2px 16px;}

        .modal-footer {
          padding: 2px 16px;
          color: white;
            text-align: center;
        }
    .clearboth{
        height: 1px;
        clear:both;
    }
    .prod-containers{
        float: left;
    }
    
    .left-container{
        width: 50%;
        margin-right: 30px;
    }
    .right-container{
        width: 45%;
    }
    .right-container h1{
        font-size: ${config.prodTitleSize? config.prodTitleSize : '30px'};
        color:${config.prodDescriptionColor?config.prodDescriptionColor: '#000'};
    }
    .yqv-featured-image{
        border: ${config.prodFeatureImageShowBorder?(config.prodFeaturedImageBorder?config.prodFeaturedImageBorder:'1px solid #ccc'):'none'};
    }
    .yqv-featured-image img{
        width: 100%;
    }
    .yqv-gallery-images{
        text-align: center;
    }
    .yqv-gallery-images a{
        display: inline-block;
        max-width: 100px;
        max-height: 100px;
        margin-right: 7px;
        margin-top: 7px;
        border: ${config.prodFeatureImageShowBorder?(config.prodFeaturedImageBorder?config.prodFeaturedImageBorder:'1px solid #ccc'):'none'};
    }
    .yqv-gallery-images a img{
        width: 100%;
        height: 100%;
    }
    h3{
        font-size: 16px;
    }
    .yqv-prod-desc{
        overflow: hidden;
        position: relative;
        line-height: 1.2em;
        max-height: 3.6em;
        text-align: justify;
        margin-right: -1em;
        padding-right: 1em;
    }
.yqv-prod-desc:before {
    content: '...';
    position: absolute;
    right: 0;
    bottom: 0;
}
  .yqv-prod-desc:after {
      content: '';
      position: absolute;
      right: 0;
      width: 1em;
      height: 1em;
      margin-top: 0.2em;
      background: white;
  }
    .compare-price{
        text-decoration: line-through;
        color:${config.comparePriceColor?config.comparePriceColor: '#000'};
    }
    .prod-price{
        color: ${config.prodPriceColor?config.prodPriceColor: '#000'};;
    }
    .yqv-add-to-cart{
        margin: ${config.addToCartMargin?config.addToCartMargin: '30px auto 0'};
        display: block;
        padding: ${config.addToCartPadding?config.addToCartPadding: '5px 0'};
        width: 55%;
        border-radius: ${config.addToCartBorderRadius?config.addToCartBorderRadius: '5px'};
        background-color: ${config.addToCartBackgroundColor?config.addToCartBackgroundColor: '#000'};
        color: ${config.addToCartColor?config.addToCartColor: '#fff'};
        font-size: ${config.addToCartFontSize?config.addToCartFontSize: '20px'};
        font-weight: ${config.addToCartFontWeight?config.addToCartFontWeight: 'bold'};
        text-transform: ${config.addToCartTextTransform?config.addToCartTextTransform: 'uppercase'};
    }
    .prod-details{
        margin-top: 30px;
    }
    .prod-details h3, .prod-details a{
        font-size: 0.9em;
    }
    .item-added{
        display:none;
        color: ${config.itemAddedColor};
        text-align: center;
        font-size: ${config.itemAddedMessage? config.itemAddedMessage : '16px'};
    }
    .yqv-fl-rt{
        float: right;
    }
    .yqv-fl-lt{
        float: left;
    }
    .qv-trigger-btn:hover{
        background-color: ${config.quickViewBtnBackgroundColor? config.quickViewBtnBackgroundColor : '#000'};
        color: ${config.quickViewBtnColor? config.quickViewBtnColor : '#fff'};
        border: ${config.quickViewBtnBorder? config.quickViewBtnBorder : '1px solid #000'};
        border-radius: ${config.quickViewBtnBorderRadius? config.quickViewBtnBorderRadius : '5px'};
    }
	`;
                return yqvStyle;
            },
            yqvProdDetailsTemplate: function(product){
                let productDetTemp = `<div>
                                <h1>${product.title}</h1>
                                <div class='yqv-price'>
                                <span class='compare-price'>${product.compare_at_price? product.compare_at_price : ''}</span>
                                    <span class='prod-price'>${product.price}</span>
                                </div>
                                <form name='yqv-add-to-cart' onsubmit="return false;">
                                <div>
                                <label for='yqv-quantity'>Quantity</label>
                                <input type='number' name='quantity' id='yqv-quantity' min='1' step='1' pattern='[0-9]*' value='1' required/>
                                </div>
                                <button class='yqv-add-to-cart' name='add-to-cart' id='yqvAddToCartBtn'>Add to Cart</button>
                                <div class='item-added'>${product.itemAddedMessage}</div>
                                </form>
                                <div class='prod-details'>
                                    <span class='yqv-fl-lt'>
                                        <h3>PRODUCT DETAILS</h3>
                                    </span>
                                    <span class='yqv-fl-rt'>
                                        <a href='/products/${product.handle}'>SEE MORE</a>
                                    </span>
                                    <div class='clearboth'></div>
                                    <div class='yqv-prod-desc'>${product.description}</div>
                                </div>
							</div>`;
                return productDetTemp;
            },
            yqvProduct: undefined,
            loadqvCSS:function(){
                let head = document.head || document.getElementsByTagName('head')[0];
                let hasStyles = $(head).find('[data-yqv-style]');
                if(hasStyles.length === 0){
                    let style = document.createElement('style');
                    head.appendChild(style);
                    style.type = 'text/css';
                    style.setAttribute('data-yqv-style', true);
                    let styleClassDef = yqv.yqvModalStyles(yqv.shopConfig);
                    if (style.styleSheet){
                        // This is required for IE8 and below.
                        style.styleSheet.cssText = styleClassDef;
                    } else {
                        style.appendChild(document.createTextNode(styleClassDef));
                    }
                }
            },
            loadqvTemplates:function(){
                let bodyElem = $('body');
                if(bodyElem && bodyElem.length > 0){
                    bodyElem.append($(yqv.yqvModalTemplate));
                }
            },
            loadFeatureImage: function(featureImage){
                if(featureImage){
                    $('.yqv-featured-image img').attr('src', featureImage);
                    $('.yqv-featured-image').zoom({url: featureImage, magnify:(yqv.shopConfig.featureImageMagnify?yqv.shopConfig.featureImageMagnify: 2)});
                }
            },
            loadProductImages: function(featuredImage){
                let imgContainer = $(`<div></div>`);
                let images = yqv.yqvProduct.images;
                let featureImg = featuredImage ? featuredImage : yqv.yqvProduct.featured_image;
                if(featureImg){
                    let featureImgElem = `<div class='yqv-featured-image'><img src='` + featureImg + `'/></div>`;
                    $(imgContainer).append($(featureImgElem));
                }
                if(images && images.length > 0){
                    let galleryContainer = $(`<div class='yqv-gallery-images'></div>`);
                    images.forEach(function(img, index){
                        let imgElem = `<a class='gallery-image' data-feature-image="`+ img + `")'><img src='`+ img + `'/></a>`;
                        $(galleryContainer).append($(imgElem));
                    });
                    $(imgContainer).append($(galleryContainer));
                }
                $('#yqv-modal .left-container').append($(imgContainer));
                $('#yqv-modal').css('display', 'block');
                setTimeout(function() {
                    $('.yqv-featured-image').zoom({url: featureImg, magnify:(yqv.shopConfig.featureImageMagnify?yqv.shopConfig.featureImageMagnify: 2)});
                }, 1000);

            },
            getMoneyFormat:function(price){
                if('undefined' !== Shopify && Shopify.money_format){
                    let amt = Shopify.money_format;
                    amt = amt.replace('{{amount}}', price);
                    return amt;
                }
            },
            loadProductDetails: function(product){
                if(product){
                    let qvProductReplacer = {};
                    if(product.title){
                        qvProductReplacer.title = product.title;
                    }
                    if(product.price){
                        qvProductReplacer.price = yqv.getMoneyFormat((product.price/100).toFixed(2));
                        if(product.compare_at_price){
                            qvProductReplacer.compare_at_price = yqv.getMoneyFormat((product.compare_at_price/100).toFixed(2));
                        }
                    }
                    if(product.description){
                        qvProductReplacer.description = product.description;
                    }
                    if(product.handle){
                        qvProductReplacer.handle = product.handle;
                    }
                    if(yqv.shopConfig && yqv.shopConfig.itemAddedMessage){
                        qvProductReplacer.itemAddedMessage = yqv.shopConfig.itemAddedMessage;
                    } else {
                        qvProductReplacer.itemAddedMessage = 'Product added to cart!';
                    }
                    let container = $(yqv.yqvProdDetailsTemplate(qvProductReplacer));
                    if(product.options && product.options.length > 0){
                        let formElem = $(container).find(`form[name='yqv-add-to-cart']`);
                        let optContainer = $(`<div></div>`);
                        product.options.sort(function(a, b){
                            if(a.position < b.position){
                                return -1;
                            }
                        });
                        product.options.forEach(function(option, index){
                            let optionId = `product-select-${product.id}-option-${index}`;
                            let optionElem = $(`<div class='selection-wrapper'><label for='${optionId}'></label></div>`);
                            let optionLabel = $(optionElem).find('label');
                            if(typeof option === 'object'){
                                $(optionLabel).text(option.name);
                                let optionName = (option.position > -1) ? `option-index-${option.position}-${option.name}` : `option-index-${index}-${option.name}`;
                                var sel = $(`<select class='single-option-selector option-${option.position? option.position: index}'>`).attr('name', optionName).attr('id',optionId).appendTo($(optionElem));
                                option.values.forEach(function(val, indx) {
                                    $(sel).append($("<option>").attr('value',val).text(val));
                                });
                            } else{
                                $(optionLabel).text(option);
                                let optionName = `option-index-${index}-${option.name}`;
                                $(optionLabel).attr('name', optionName);
                            }
                            $(optContainer).append($(optionElem));
                        });
                        $(formElem).prepend($(optContainer));
                    }

                    $('#yqv-modal .right-container').append($(container));
                }
            },
            addItemToCart: function(yqv){
                if(yqv.yqvProduct && yqv.yqvProduct.variants){
                    let variants = yqv.yqvProduct.variants;
                    let selVariant = undefined;
                    let selQuantity = 1;
                    let formElem = $(`form[name='yqv-add-to-cart']`);
                    let addToCartCallback = function(data){
                        console.log(data);
                        $('.item-added').css('display', 'block');
                        $('#yqvAddToCartBtn').removeAttr('disabled').css('opacity', 1).text('Add to Cart');
                    };
                    if(variants.length > 1){
                        let formData = $(formElem).serializeArray();
                        let valsArr = [];
                        formData.forEach(function(elem){
                            if(elem.name !== 'quantity'){
                                valsArr.push(elem.value);
                            }else if(elem.name === 'quantity' && elem.value > 0){
                                selQuantity = elem.value;
                            }
                        });
                        for(let vIndx=0; vIndx < variants.length; vIndx++){
                            let variant = variants[vIndx];
                            if(variant.options && JSON.stringify(variant.options) === JSON.stringify(valsArr)){
                                selVariant = variant;
                                break;
                            }
                        }
                    } else if(variants.length === 1){
                        selVariant = variants[0];
                        selQuantity = $(formElem).find(`input[name='quantity']`).val() || 1;
                    }
                    if(selVariant && selVariant.id && selQuantity > 0){
                        if(typeof Shopify.addItem === 'function'){
                            Shopify.addItem(selVariant.id, selQuantity, addToCartCallback);
                        }else{
                            let reqData = {
                                id: selVariant.id,
                                quantity: selQuantity
                            };
                            let posting = jQuery.post('/cart/add.js', reqData, addToCartCallback, "json");
                        }
                    }
                }

            },
            showProductQuickView: function(elem){
                if(elem && elem.attr('data-yqv-handle')){
                    let prodHandle = $(elem).attr('data-yqv-handle');
                    let prodDetails = jQuery.getJSON('/products/' + prodHandle + '.js', function(product) {
                        console.log(product);
                        yqv.yqvProduct = product;
                        yqv.loadProductDetails(product);
                        yqv.loadProductImages();
                    } );
                }
            },
            attachyqvBtnEventHandlers: function(){
                let yqvTriggerBtn = $('.qv-trigger-btn');
                $(document).on('click', '.qv-trigger-btn', function(e){
                    e.preventDefault();
                    yqv.showProductQuickView($(this));
                });
                $(document).on('click', '.yqv-modal-close', function(e){
                    e.preventDefault();
                    $('#yqv-modal').css('display', 'none').find('.prod-containers').empty();
                });
                $('a[href*="/products/"]').on({
                    mouseenter: function (e) {
                        $(this).find('.qv-trigger-btn').css('display', 'block');
                    },
                    mouseleave: function (e) {
                        $(this).find('.qv-trigger-btn').css('display', 'none');
                    }
                });
                $(document).on('click', '.gallery-image', function(e){
                    let featureImage = $(this).attr('data-feature-image');
                    if(featureImage){
                        yqv.loadFeatureImage(featureImage);
                    }
                });
                $(document).on('click', '#yqvAddToCartBtn', function(e){
                    e.preventDefault();
                    $('.item-added').css('display', 'none');
                    $(this).attr('disabled', 'disabled').css('opacity', 0.5).text('Adding to Cart');
                    yqv.addItemToCart(yqv);
                });
            },
            loadqvTrigger: function(){
                let pagePath = location.href;
                if(pagePath.toLowerCase().indexOf('products') < 0){
                    let triggerContainers = $('a[href*="/products/"]');
                    triggerContainers.each(function(index){
                        let yqvTriggerBtn = $(yqv.yqvModalTriggerButton).clone();
                        let prodHandleHref = $(this).attr('href');
                        let prodHandle = prodHandleHref.substr(prodHandleHref.lastIndexOf ("/") + 1);
                        $(yqvTriggerBtn).attr('data-yqv-handle', prodHandle);
                        $(this).append(yqvTriggerBtn);
                    });
                    yqv.attachyqvBtnEventHandlers();
                }
            },
            loadqvComponents: function(){
                yqv.loadqvCSS();
                yqv.loadqvTemplates();
                yqv.loadqvTrigger();
            },
            getStoreConfig:function(yqv){
                let APIUrl = "https://2a786bb3.ngrok.io/api/v1/shopify/config?shop=" + Shopify.shop;
                $.ajax({
                    url: APIUrl,
                    headers: {
                        'x-access-token':Shopify.shop
                    },
                    method: 'GET',
                    success: function(data){
                        if(data && data.config){
                            yqv.shopConfig = data.config;
                            yqv.loadqvComponents();
                        }
                    }
                });
            },
            init: function(){
                yqv.getStoreConfig(yqv);
                // yqv.loadqvComponents();
            }
        };
        yqv.init();
    };
    let loadScript = function(url, callback){

        let script = document.createElement("script");
        script.type = "text/javascript";

        // If the browser is Internet Explorer.
        if (script.readyState){
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
            // For any other browser.
        } else {
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);

    };
    if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 1.7)) {
        loadScript('//ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js', function(){
            jQuery300 = jQuery.noConflict(true);
            qvYappsScripts(jQuery300);
        });
    } else {
        qvYappsScripts(jQuery);
    }
})();
/*!
	Zoom 1.7.21
	license: MIT
	http://www.jacklmoore.com/zoom
*/
(function(o){var t={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};o.zoom=function(t,n,e,i){var u,c,a,r,m,l,s,f=o(t),h=f.css("position"),d=o(n);return t.style.position=/(absolute|fixed)/.test(h)?h:"relative",t.style.overflow="hidden",e.style.width=e.style.height="",o(e).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:e.width*i,height:e.height*i,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(t),{init:function(){c=f.outerWidth(),u=f.outerHeight(),n===t?(r=c,a=u):(r=d.outerWidth(),a=d.outerHeight()),m=(e.width-c)/r,l=(e.height-u)/a,s=d.offset()},move:function(o){var t=o.pageX-s.left,n=o.pageY-s.top;n=Math.max(Math.min(n,a),0),t=Math.max(Math.min(t,r),0),e.style.left=t*-m+"px",e.style.top=n*-l+"px"}}},o.fn.zoom=function(n){return this.each(function(){var e=o.extend({},t,n||{}),i=e.target&&o(e.target)[0]||this,u=this,c=o(u),a=document.createElement("img"),r=o(a),m="mousemove.zoom",l=!1,s=!1;if(!e.url){var f=u.querySelector("img");if(f&&(e.url=f.getAttribute("data-src")||f.currentSrc||f.src),!e.url)return}c.one("zoom.destroy",function(o,t){c.off(".zoom"),i.style.position=o,i.style.overflow=t,a.onload=null,r.remove()}.bind(this,i.style.position,i.style.overflow)),a.onload=function(){function t(t){f.init(),f.move(t),r.stop().fadeTo(o.support.opacity?e.duration:0,1,o.isFunction(e.onZoomIn)?e.onZoomIn.call(a):!1)}function n(){r.stop().fadeTo(e.duration,0,o.isFunction(e.onZoomOut)?e.onZoomOut.call(a):!1)}var f=o.zoom(i,u,a,e.magnify);"grab"===e.on?c.on("mousedown.zoom",function(e){1===e.which&&(o(document).one("mouseup.zoom",function(){n(),o(document).off(m,f.move)}),t(e),o(document).on(m,f.move),e.preventDefault())}):"click"===e.on?c.on("click.zoom",function(e){return l?void 0:(l=!0,t(e),o(document).on(m,f.move),o(document).one("click.zoom",function(){n(),l=!1,o(document).off(m,f.move)}),!1)}):"toggle"===e.on?c.on("click.zoom",function(o){l?n():t(o),l=!l}):"mouseover"===e.on&&(f.init(),c.on("mouseenter.zoom",t).on("mouseleave.zoom",n).on(m,f.move)),e.touch&&c.on("touchstart.zoom",function(o){o.preventDefault(),s?(s=!1,n()):(s=!0,t(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(o){o.preventDefault(),f.move(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0])}).on("touchend.zoom",function(o){o.preventDefault(),s&&(s=!1,n())}),o.isFunction(e.callback)&&e.callback.call(a)},a.setAttribute("role","presentation"),a.alt="",a.src=e.url})},o.fn.zoom.defaults=t})(window.jQuery);
