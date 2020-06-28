$('#header').load('header.html');
$('#footer').load('footer.html');
var swiper1 = new Swiper('.outer-carousel .swiper-container', {
    direction: 'vertical',
    loop: true,
    autoplay: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});
var swiper2 = new Swiper('.inner-carousel .swiper-container', {
    autoplay: true,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
var swiper3 = new Swiper('#goods-carousel .swiper-container', {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
// var swiper3 = new Swiper('#goods-carousel .swiper-container', {
//     autoplay: true,
//     loop: true,
//     spaceBetween:20,
//     slidesPerGroup : 8,
//     slidesPerView: 4,//一行显示3个
//     slidesPerColumn: 2,//显示2行
//     slidesPerColumnFill : 'row',
//     // pagination: {
//     //     el: '.swiper-pagination',
//     //     type: 'fraction',
//     // },
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
// });
$('.pop-list .pop-ul li').hover(function () {
    $(this).addClass('active').siblings().removeClass('active').parent().parent().parent().find('.pop-show').eq($(this).index()).show().siblings().hide();
    // $(this).addClass('active').siblings().removeClass('active');
    // var index = $(this).index();
    // $(".pop-detail .pop-show").eq(index).show()
    // .siblings().hide();

})
var swiper4 = new Swiper('.creat-show .swiper-container', {
    slidesPerView: 4,
    spaceBetween: 37,
    autoplay:true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });