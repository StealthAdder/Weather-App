let tempR = document.querySelector('.tempR');
let tempDegree = document.querySelector('.temperature-degree');

function tempChange () {
    let temp = tempConv()
    if (tempR.textContent == "°F") {
        // make it C
        tempR.innerHTML = "°C";
        tempDegree.innerHTML = temp
    } else {
        tempR.innerHTML = "°F";
        tempDegree.innerHTML = temp;
    }
}

function tempConv () {
    let F, C;
    if (tempR.textContent == "°F") {
        F = parseFloat(tempDegree.textContent);
        C = (F - 32) * (5 / 9);
        return Math.round(C);
    } else if (tempR.textContent == "°C") {
        C = parseFloat(tempDegree.textContent);
        F = (C * 9/5) + 32;
        return F;
    }
}