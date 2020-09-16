function getUser() {
    document.getElementById('resultRepos').style.display = "none";
    document.getElementById('resultStars').style.display = "none";
    var form = document.getElementById("myForm").addEventListener('submit', function (e) {
        e.preventDefault();
        var search = document.getElementById("search").value
        if (search == null || search == "") {
            alert("Valor inválido.");
            return;
        }
        fetch("https://api.github.com/users/" + search)
            .then(result => {
                if (result.status == 404) {
                    document.getElementById('result').style.display = "flex";
                    document.getElementById('header').innerHTML = "Usuário não encontrado.";
                    document.getElementById('userData').style.display = "none";
                    document.getElementById('imgResult').style.display = "none";
                    return;
                } else  if (result.status !== 200) {
                    console.log('Erro na consulta. Código do status: ' +
                        result.status);
                    return;
                } else {
                    console.log("ok");
                    result.json() .then((data) => {
                        document.getElementById('loginResult').innerHTML = `${data.login}`;
                        document.getElementById('urlResult').href = `${data.html_url}`;
                        document.getElementById('result').style.display = "flex";
                        document.getElementById('imgResult').src = `${data.avatar_url}`;
                    })
                }
            })

    })
}

function getRepos() {
    document.getElementById('resultStars').style.display = "none";
    document.getElementById('repos').innerHTML = "";
    var search = document.getElementById("search").value
    fetch("https://api.github.com/users/" + search + "/repos")
        .then(result => {
            if (!result.ok) {
                throw Error("Erro na busca. ");
            }
            return console.log(result.json());
        })
        .then(data => {
            const info = data.map(item => {
                var repo = item.name;
                return (`<br>${item.name}`);
            });
            document.getElementById('resultRepos').style.display = "block";
            document
                .querySelector("#repos")
                .insertAdjacentHTML("afterbegin", info);
        })
        .catch(error => {
            console.log(error);
        });
}

function getStarred() {
    document.getElementById('resultRepos').style.display = "none";
    document.getElementById('stars').innerHTML = "";
    var search = document.getElementById("search").value
    fetch("https://api.github.com/users/" + search + "/starred")
        .then(result => {
            if (!result.ok) {
                throw Error("Erro na busca.");
            }
            return result.json();
        })
        .then(data => {
            const info = data.map(item => {
                var starred = item.owner.starred_url;
                return (`<br>${item.name}`);
            });
            document.getElementById('resultStars').style.display = "block";
            document
                .querySelector("#stars")
                .insertAdjacentHTML("afterbegin", info);
        })
        .catch(error => {
            console.log(error);
        });
}