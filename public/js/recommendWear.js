const id = localStorage.getItem('id');
const url = localStorage.getItem('url');
const sex = localStorage.getItem('sex');

document.getElementById('userimg').innerHTML = `
<img src="${url}" style="width: 300px;  margin: 30px 30px 0px 30px "/>`;

document.getElementById('imageResultContent').innerHTML = `
    <p><strong>성별:</strong> ${sex}</p>
`;

if (id) {
    fetch(`/api/2024-02/tagging/tags/${id}?-`, {
        method: 'GET',
        headers: {
            'x-api-key': '-'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        displayNames(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
} else {
    console.error('No input data found in localStorage');
}

function displayNames(data) {
    const imageResultContent = document.getElementById('imageResultContent');
    const imageResultContent2 = document.getElementById('imageResultContent2');

    if (!imageResultContent) {
        console.error('Element with ID "imageResultContent" not found');
        return;
    }
    if (!imageResultContent2) {
        console.error('Element with ID "imageResultContent2" not found');
        return;
    }

    function extractAndAppendNames(tags, container, type) {
        tags.forEach(tag => {
            if (tag.category && tag.category.name) {
                const categoryName = document.createElement('p');
                categoryName.textContent = `카테고리: ${tag.category.name}`;
                container.appendChild(categoryName);
            }
            if (tag.item && tag.item.name) {
                const itemName = document.createElement('p');
                itemName.textContent = `옷 종류: ${tag.item.name}`;
                container.appendChild(itemName);
            }
            if (tag.length && tag.length.name) {
                const lengthName = document.createElement('p');
                lengthName.textContent = `길이: ${tag.length.name}`;
                container.appendChild(lengthName);
            }
            if (tag.sleeveLength && tag.sleeveLength.name) {
                const sleeveLengthName = document.createElement('p');
                sleeveLengthName.textContent = `소매 길이: ${tag.sleeveLength.name}`;
                container.appendChild(sleeveLengthName);
            }
            if (tag.neckLine && tag.neckLine.name) {
                const neckLineName = document.createElement('p');
                neckLineName.textContent = `넥라인: ${tag.neckLine.name}`;
                container.appendChild(neckLineName);
            }
            if (tag.fit && tag.fit.name) {
                const fitName = document.createElement('p');
                fitName.textContent = `Fit: ${tag.fit.name}`;
                container.appendChild(fitName);
                localStorage.setItem(`${type}_fit`, `${tag.fit.name}`);
            }
            if (tag.shape && tag.shape.name) {
                const shapeName = document.createElement('p');
                shapeName.textContent = `Shape: ${tag.shape.name}`;
                container.appendChild(shapeName);
            }
            if (tag.colors && tag.colors.length > 0) {
                const colorName = document.createElement('p');
                colorName.textContent = `색깔: ${tag.colors[0].name}`;
                container.appendChild(colorName);
                localStorage.setItem(`${type}_colors`, `${tag.colors[0].name}`);
            }
            if (tag.prints && tag.prints.length > 0) {
                const printsName = document.createElement('p');
                printsName.textContent = `프린트: ${tag.prints[0].name}`;
                container.appendChild(printsName);
            }
            if (tag.textures && tag.textures.length > 0) {
                const textureName = document.createElement('p');
                textureName.textContent = `소재: ${tag.textures[0].name}`;
                container.appendChild(textureName);
            }
            if (tag.details && tag.details.length > 0) {
                const detailsName = document.createElement('p');
                detailsName.textContent = `디테일: ${tag.details[0].name}`;
                container.appendChild(detailsName);
            }
            if (tag.looks && tag.looks.length > 0) {
                const lookName = document.createElement('p');
                lookName.textContent = `스타일: ${tag.looks[0].name}`;
                container.appendChild(lookName);
                localStorage.setItem(`${type}_looks`, `${tag.looks[0].name}`);
            }
            if (tag.shoulderShape && tag.shoulderShape.name) {
                const shoulderShapeName = document.createElement('p');
                shoulderShapeName.textContent = `어깨모양: ${tag.shoulderShape.name}`;
                container.appendChild(shoulderShapeName);
            }
        });
    }

    function determineType(category) {
        if (category.name.toLowerCase().includes('top')) return 'top';
        if (category.name.toLowerCase().includes('pants') || category.name.toLowerCase().includes('bottom') || category.name.toLowerCase().includes('skirt') || category.name.toLowerCase().includes('jeans')) return 'bottom';
        if (category.name.toLowerCase().includes('shoe')) return 'shoe';
        return 'other';
    }

    if (data.matchedObjects) {
        data.matchedObjects.forEach(object => {
            const categoryTag = object.tags.find(tag => tag.category);
            const type = categoryTag ? determineType(categoryTag.category) : 'other';
            extractAndAppendNames(object.tags, imageResultContent, type);
        });
    }

    if (data.notMatchedObjects) {
        data.notMatchedObjects.forEach(object => {
            const categoryTag = object.tags.find(tag => tag.category);
            const type = categoryTag ? determineType(categoryTag.category) : 'other';
            extractAndAppendNames(object.tags, imageResultContent2, type);
        });
    }
}

const rcolor = localStorage.getItem('top_colors')
console.log(rcolor)
// function openTop(){
//     var popup = window.open('https://www.musinsa.com/search/musinsa/goods?q=over&category1=003%3A%EB%B0%94%EC%A7%80%3Atrue%3A&color=25%3A%EB%8B%A4%ED%81%AC+%EA%B7%B8%EB%A0%88%EC%9D%B4%3Atrue%3A&price=0%5E200000%3A200_000%EC%9B%90+%EC%9D%B4%ED%95%98%3Atrue%3A', '추천', 'width=900px,height=1500px,scrollbars=yes')
//     }


// function openbottom(){
//     var popup = window.open('https://www.musinsa.com/search/musinsa/goods?q=over&category1=003%3A%EB%B0%94%EC%A7%80%3Atrue%3A&color=25%3A%EB%8B%A4%ED%81%AC+%EA%B7%B8%EB%A0%88%EC%9D%B4%3Atrue%3A&price=0%5E200000%3A200_000%EC%9B%90+%EC%9D%B4%ED%95%98%3Atrue%3A', '추천', 'width=900px,height=1500px,scrollbars=yes')
// }



if(localStorage.getItem('wear') == 'TOP'){
    if(rcolor=='White'){
        function openTop(){
            var popup = window.open('https://www.musinsa.com/search/musinsa/goods?q=over&color=2%3A%EA%B2%80%EC%A0%95%EC%83%89%3Atrue%3A&price=0%5E200000%3A200_000%EC%9B%90+%EC%9D%B4%ED%95%98%3Atrue%3A&sex=M&category1=003%3A%EB%B0%94%EC%A7%80%3Atrue%3A', '추천', 'width=900px,height=1500px,scrollbars=yes')
        }
    }else{
        function openTop(){
            var popup = window.open('https://www.musinsa.com/search/musinsa/goods?q=over&color=30%3A%EC%B9%B4%ED%82%A4%3Atrue%3A&price=0%5E200000%3A200_000%EC%9B%90+%EC%9D%B4%ED%95%98%3Atrue%3A&sex=M&category1=003%3A%EB%B0%94%EC%A7%80%3Atrue%3A', '추천', 'width=900px,height=1500px,scrollbars=yes')
            }
        
    }
}


    if(localStorage.getItem('bottom_colors')=='Black'){
        function openbottom(){
            var popup = window.open('https://www.musinsa.com/search/musinsa/goods?q=over&sex=M&color=1%3A%ED%9D%B0%EC%83%89%3Atrue%3A&category1=001%3A%EC%83%81%EC%9D%98%3Atrue%3A', '추천', 'width=900px,height=1500px,scrollbars=yes')
            }
    }else if(localStorage.getItem('bottom_colors')=='Blue'){
        function openbottom(){
            var popup = window.open('https://www.musinsa.com/search/musinsa/goods?q=over&sex=M&color=1%3A%ED%9D%B0%EC%83%89%3Atrue%3A&category1=001%3A%EC%83%81%EC%9D%98%3Atrue%3A', '추천', 'width=900px,height=1500px,scrollbars=yes')
            }
    }else{
        function openbottom(){
            var popup = window.open('https://www.musinsa.com/search/musinsa/goods?q=%EC%83%81%EC%9D%98&sex=M&category1=001%3A%EC%83%81%EC%9D%98%3Atrue%3A&color=36%3A%EB%84%A4%EC%9D%B4%EB%B9%84%3Atrue%3A', '추천', 'width=900px,height=1500px,scrollbars=yes')
            }
    }

