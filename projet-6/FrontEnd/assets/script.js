console.log("The script starts.")


/* ___________________________________________________________ */
/* Récupération des données de l'API !                         */
/* ___________________________________________________________ */
async function getData() {
    try {
        const apiUrl = 'http://localhost:5678/api/works/';
        const resp = await fetch(apiUrl);
        const respContent = await resp.json();
        return respContent;

    } catch (error) {
        console.error(error);
    }
}

/* ___________________________________________________________ */
/* Variables utilitaires communes.                             */
/* ___________________________________________________________ */
let arrayClassFilters;
let arrayFiltersComponent;

/* ___________________________________________________________ */
/* Modification des éléments pour correspondre au filtrage.    */
/* ___________________________________________________________ */
function showClass(element, name) {
    arrayClassFilters = element.className.split(" ");                           // Split permet de "séparer" les éléments dans un tableau.
    arrayFiltersComponent = name.split(" ");                                    // Espacement d'un espace dans le tableau.

    for (let i = 0; i < arrayFiltersComponent.length; i++) {                   // Parcours le contenu du tableau contenant les objets renseignés.
        if (arrayClassFilters.indexOf(arrayFiltersComponent[i]) == -1) {       // indexOf renvoi au positionnement de l'objet dans le tableau.
            element.className += " " + arrayFiltersComponent[i];               // Alors update le className avec un espacement et la classe à rajouter.
        }
    }
}

/* ___________________________________________________________ */
/* Masquage des éléments non demandés au filtrage.             */
/* ___________________________________________________________ */
function hideClass(element, name) {
    arrayClassFilters = element.className.split(" ");                                          // Nos deux tableaux sont de retour.
    arrayFiltersComponent = name.split(" ");

    for (let i = 0; i < arrayFiltersComponent.length; i++) {                                   // Même boucle.
        while (arrayClassFilters.indexOf(arrayFiltersComponent[i]) > -1) {                     // On vient selectionner l'inverse, les autres composants du tableau via le changement if => while.
            arrayClassFilters.splice(arrayClassFilters.indexOf(arrayFiltersComponent[i]), 1);  // Splice permet de supprimer les éléments précis du tableau, ici les classes CSS.
        }
    }
    element.className = arrayClassFilters.join(" "); // Toutes les classes ayant été delete. On lance une actualisation avec join(" ").
}

/* ___________________________________________________________ */
/* Applique un filtre de séléction !                           */
/* ___________________________________________________________ */
function filterSelection(choose) {                                   // L'argument va être le button sélectionné.
    let x = document.getElementsByClassName("figureCard");           // Séléction des filterDiv.
    if (choose == "all") {                                           // Si le button "tout" est selectionné.
        choose = "";                                                 // Il n'y a plus de filtrage (suite de la function).                                                                                            
    }
    for (let i = 0; i < x.length; i++) {
        hideClass(x[i], "show");
        if (x[i].className.indexOf(choose) > -1) {
            showClass(x[i], "show");
        }
    }
}

/* ___________________________________________________________ */
/* Affiche les éléments.                                       */
/* ___________________________________________________________ */
function dataShow() {
    for (let i = arrayData.length - 1; i >= 0; i--) {                       // Boucle qui affichera les images dans le sens inverse.

        let galleryTargeting = document.querySelector(".gallery");
        if (galleryTargeting != null) {
            let galleryCard = document.createElement("figure");
            let galleryImage = document.createElement("img");
            let galleryTxt = document.createElement("figcaption");

            //console.log(arrayData[i].categoryId);
            galleryCard.setAttribute("class", "figureCard " + arrayData[i].categoryId);     // Attribution d'une class aux arrayData.length cards (balises <figure>).         
            galleryTargeting.prepend(galleryCard);                                          // Ajout des cards (balises <figure>).

            galleryImage.setAttribute("src", arrayData[i].imageUrl);            // Modification de l'attribut de la source img via l'API.
            galleryImage.setAttribute("alt", arrayData[i].title);

            galleryTxt.innerText = arrayData[i].title;                          // Modification de le la description de l'img via l'API.
            galleryTxt.setAttribute("class", "img_title");

            let InsideCardTargeting = document.querySelector(".figureCard");    // Préparation d'un placement dans les cards via la classe des balises <figure>.
            InsideCardTargeting.prepend(galleryImage, galleryTxt);              // L'incorporation des deux sous-balises.
        }
        filterSelection("all");             // Attend l'importation pour lancer le premier filtre : "all".
    }
}

/* ___________________________________________________________ */
/* ACTION - Stockage de l'API dans un tableau.                 */
/* ___________________________________________________________ */
let arrayData;                      // Mise en place des data de l'API dans un tableau.
getData().then(result => {          // Une fois que la function aura été executée, prend sa valeur de retour.
    arrayData = result;             // Et donne la au tableau arrayData (le JSON).
    dataShow();
})

/* ___________________________________________________________ */
/* ACTION - Ecoute des menus filtres S'IL Y EN A !             */
/* ___________________________________________________________ */
let buttonContainer = document.getElementById("sortingButton");                 // Récupération de la <div> contenant les filtres.
if (buttonContainer != null) {                                                  // S'il y a un "sortingButton" de trouvé, alors :
    let buttonItem = buttonContainer.getElementsByClassName("filter_button");   // Récupération des filters_button (enfants) dans une variable-tableau.
    for (let i = 0; i < buttonItem.length; i++) {                               // Parcours le tableau contenant les buttons filtres un par un.
        buttonItem[i].addEventListener("click", function () {                   // Pour chaque bouton, un EventListener par clique est initié.
            let current = document.getElementsByClassName("active");            // Ce clique déclanche la récupération éléments avec classe "active" et le stock.
            if (current.length == 0) {              // Reviens à dire : "Si rien n'est séléctionné" (aucun filtre) alors :
                this.className += " active";        // En cas d'action, du click, la classe "active" est ajoutée.
            }
            else {
                current[0].className = current[0].className.replace(" active", ""); // Mais si quelque chose était déjà séléctionné, retire le via replace dans le tableau listant les classes.
                this.className += " active";                                        // Puis ajoute active sur le "bouton" cliqué.
            }
        });
    }
}

console.log("The 'modal'-part of the script just started.")

/* ___________________________________________________________ */
/* Utilisation différente de "dataShow", adaptée à la modale ! */
/* ___________________________________________________________ */
function dataShowModal() {
    for (let i = arrayData.length - 1; i >= 0; i--) {                           // Boucle qui affichera les images dans le sens inverse.

        /* Déclaration des variables ! */
        let galleryTargetingEdit = document.querySelector(".edit_gallery");     // On vient, cette fois ci, se placer dans .edit_gallery, une div dans la modale !
        let galleryCardEdit = document.createElement("figure");
        let galleryTxtEdit = document.createElement("a");
        let galleryIconeEdit = document.createElement("div");
        let galleryIconeTrashEdit = document.createElement("i");
        let galleryIconeMoveEdit = document.createElement("i");
        let galleryImageEdit = document.createElement("img");

        /* Gestion des attributs ! */
        galleryImageEdit.setAttribute("src", arrayData[i].imageUrl);            // Modification de l'attribut de la source img via les données importées de l'API.
        galleryImageEdit.setAttribute("alt", arrayData[i].title);
        galleryTxtEdit.innerText = "éditer";                                    // Ne renvoie à rien mais pourrait à l'avenir.
        galleryIconeTrashEdit.setAttribute("class", "fa-solid fa-trash-can");
        galleryIconeMoveEdit.setAttribute("class", "fa-solid fa-up-down-left-right");

        /* Ajout des balises-parents ! */
        galleryCardEdit.setAttribute("class", "edit_figureCard");                    // Attribution d'une class aux balises <figure>.         
        galleryTargetingEdit.prepend(galleryCardEdit);                               // Ajout des cards (balises <figure>).

        /* Ajout des balises-enfants ! */
        let insideCardTargetingEdit = document.querySelector(".edit_figureCard");       // On se replace au niveau de notre balise fraichement ajoutée :
        insideCardTargetingEdit.prepend(galleryImageEdit, galleryTxtEdit);              // Ajout des composants précedemment définis.

        /* Gestion des icones ! */
        galleryIconeEdit.setAttribute("class", "edit_iconeManagement");
        insideCardTargetingEdit.prepend(galleryIconeEdit);
        let insideGalleryIconeEdit = document.querySelector(".edit_iconeManagement");   // Je me place au niveau de cette nouvelle balise enfants, qui va devenir parent.
        if (i == 0) {
            insideGalleryIconeEdit.prepend(galleryIconeMoveEdit, galleryIconeTrashEdit);
        }
        else {
            insideGalleryIconeEdit.prepend(galleryIconeTrashEdit);
        }
    }
};

/* ___________________________________________________________ */
/* Suppression du DOM généré par dataShowModal !               */
/* ___________________________________________________________ */
function modalRemove() {
    /* Déclaration des variables à supprimer ! */
    let figureCardsToDeleteEdit = document.querySelectorAll(".edit_figureCard");        // Selection de toutes les classes .edit_figureCard.
    figureCardsToDeleteEdit.forEach(function (e) {                                      // Remove ne peut être utilisé que sur un seul élément donc, pour chaque élément de figureCardsToDeleteEdit :
        e.remove();                                                                     // Remove.
    });
}

/* ___________________________________________________________ */
/* Ouverture de la modale !                                    */
/* ___________________________________________________________ */
const modalLinks = document.querySelectorAll('a[href="#modalBox"]'); // Tous les liens (a) avec href qui comporte notre ancrage.
modalLinks.forEach(link => {                                         // Ecoute chaque clique sur ces deux lien.
    link.addEventListener("click", (event) => {
        event.preventDefault();                                          // On ne veut pas un fonctionnement de l'ancrage.
        const modalBox = document.getElementById("modalBox");            // modalBox est notre élément comportement l'ID modalBox.
        modalBox.classList.remove("modalBox-hidden");                    // On lui retire la modalBox-hidden, ce qui le révèle. 
        modalBox.removeAttribute("aria-hidden");                         // Gestion des balises liées à l'accesibilité pour personnes mal-voyantes.
        modalBox.setAttribute("aria-modal", "true");                     // //
        dataShowModal();
    });
});

/* ___________________________________________________________ */
/* Fermeture de la modale !                                    */
/* ___________________________________________________________ */
function closeModal() {
    modalBox.classList.add("modalBox-hidden");                    // On lui remet la modalBox-hidden, ce qui le cache. 
    modalBox.setAttribute("aria-hidden", "true");                 // Gestion des balises liées à l'accesibilité pour personnes mal-voyantes.
    modalBox.setAttribute("aria-modal", "false");                 // //                                             // La modale n'est plus ouverte.
    modalRemove();                                                // Supprimer le contenu DOM générer pour pouvoir rouvrir la modale sans avoir une accumulation.
}

/* ___________________________________________________________ */
/* Fermeture de la modale possible au click de la croix.       */
/* ___________________________________________________________ */
const modalCross = document.querySelector(".fa-xmark");
if (modalCross != null) {
    modalCross.addEventListener('click', () => {
        closeModal();
    });
}
console.log("The script just ended.")

/* ___________________________________________________________ */
/* Formulaire.                                                 */
/* ___________________________________________________________ */
let tokenSaved = "";

/* ___________________________________________________________ */
/* Envoie des ID et attente de réponse.                        */
/* ___________________________________________________________ */
async function postData(url = "", data = {}) {              // Function async ayant besoin d'une URL et de données. 
    const response = await fetch(url, {                       // une réponse sous forme de constante est attendue.
        method: "POST",                                         // Le fetch initié est en méthode POST.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),                          // Les données de "data" sont stringifiées en JSON avant d'être envoyées.
    });

    const responseJSON = await response.json();            // Attente de notre réponse en .JSON de l'API et stockage de son contenu.
    tokenSaved = responseJSON.token;                       // Stocker le token de réponse dans la variable "token"
    return responseJSON;                                   // On return notre constante qui fait la demande et reçoit la réponse comme résultat de la function.
}

let form = document.getElementById('login_form');     // Selection de notre formulaire.
if (form != null) {                                   // Si l'ID "form" correspond à qq chose, alors :
    form.addEventListener("submit", (ev) => {             // Si on clique sur Submit avec l'argument étant le contenu du form !
        ev.preventDefault();                              // N'actualise pas la page quand on clique.
        let data = new FormData(ev.target);               // Création d'un objet "data" qu'on vient remplir avec le contenu de la cible, à savoir lui même, en gros : Envoie du contenu du formulaire dans "data".
        let user = {                                      // Nouvel objet user qui vient recevoir pour email le contenu de la balise "email_login" de l'objet "data" et idem pour le password.
            email: data.get('email_login'),
            password: data.get('password_login')
        };

        let errorField = document.querySelector(".errorEmptyField");    // S'il y a déjà un message d'erreur car le formulaire n'est pas correctement reseigné.
        if (errorField != null) {                                       // Si l'élément est trouvé, alors :
            errorField.parentNode.removeChild(errorField);              // On supprime l'élément du DOM.
        }

        if (user.email.trim() !== '' && user.password.trim() !== '') {                // trim permet de valider une chaine de charactère vide, cela évite les erreurs d'interprétations de "false".
            postData('http://127.0.0.1:5678/api/users/login', user).then(data => {    // Ensuite, appelle de la fonction postData avec l'URL de l'API et nos données de formulaire en argument.
                console.log(data);                                                    // Vérification du bon contenu de "data".
                console.log(tokenSaved);                                              // Vérification du bon contenu du token !
                                                                                      // S'il est renseigné un champ email et MDP, il ne peut y avoir que deux cas de figure :
            /* ___________________________________________________________ */
            /* Dans le cas où l'API ne retourne pas d'erreur :             */
            /* ___________________________________________________________ */
            if (data.userId == 1) {
                window.location.href = '../pages/index_edit.html';
            }

            /* ___________________________________________________________ */
            /* Dans le cas où l'API retourne une erreur :                  */
            /* ___________________________________________________________ */
            else {
                let link = document.querySelector("#button_login");
                let p = document.createElement("p");
                p.setAttribute("class", "errorEmptyField")
                let textError = document.createTextNode("Les informations ne correspondent pas.");
                p.appendChild(textError);
                link.parentNode.insertBefore(p, link);
            }
            })

        } else {                                                                      // Et sinon, on insère en DOM à l'utilisateur qu'il doit remplir tous les champs !
            let link = document.querySelector("#button_login");
            let p = document.createElement("p");
            p.setAttribute("class", "errorEmptyField")
            let textError = document.createTextNode("Veuillez remplir tous les champs.");
            p.appendChild(textError);
            link.parentNode.insertBefore(p, link);
        }
    })
};