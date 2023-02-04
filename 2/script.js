const btn=document.querySelector('.j-btn-test');

//Обработка нажатия на кнопку и вывод размеров экрана
btn.addEventListener('click',()=>{
    const width=window.screen.width;
    const height=window.screen.height;
    alert(`Размеры экрана: ширина - ${width}, высота - ${height}`);
});