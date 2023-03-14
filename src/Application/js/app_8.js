$(document).ready(function () {


    $('#login_modal').modal('show')
    // alert('xsxsxs')


    // window.onbeforeunload = function () {
    //     localStorage.removeItem("id_chat_user_bewell");
    //     return '';
    // };




    // document.addEventListener('contextmenu', event => event.preventDefault());
    // alert('verification')



    // verifier_user()


    document.body.classList.add('dark-mode');






});








document.getElementById('btn_connexion').addEventListener('click', function (e) {
    e.preventDefault()


    let le_pseudo = document.getElementById('le_pseudo').value.trim()
    let mdp = document.getElementById('mdp').value.trim()

    if (le_pseudo == "" || mdp == '') {
        swal({
            title: "erreur",
            text: "Tous les champs sont obligatoire",
            icon: "error",
            button: "D'accord",
            closeOnClickOutside: false,
            dangerMode: true,
        });
    } else {

        document.getElementById('my_spinner').style.display = 'block'

        let les_donnees = new FormData();

        les_donnees.append("pseudo", le_pseudo);
        les_donnees.append("mot_de_passe", mdp);

        fetch(URL + "/connexion", {
            method: "POST",
            body: les_donnees,
        })
            .then((response) => response.json())
            .then((response) => {

                console.log(response)

                document.getElementById('my_spinner').style.display = 'none'

                if (response.resultat == "not_found") {

                    swal({
                        title: "erreur",
                        text: "Nom d'utilisateur ou mot de passe incorrect",
                        icon: "warning",
                        button: "D'accord",
                        closeOnClickOutside: false,
                        dangerMode: true,
                    });

                } else if (response.resultat == "user_found") {
                    $('#login_modal').modal('hide')
                    document.getElementById('le_pseudo').value = ""
                    document.getElementById('mdp').value = ""

                    USER_NAME = le_pseudo

                    information_personnel();
                    mes_invitation()
                    setInterval(() => {
                        mes_amis()
                        mes_invitation()
                    }, 1500);

                    var MON_INTERVAL = setInterval(() => {
                        recuperer_messages()
                    }, 1500);



                    // window.localStorage.setItem('id_chat_user_bewell', le_pseudo)
                    // document.location.href = 'index.html'

                } else {
                    swal({
                        title: "erreur",
                        text: "Une erreur 's'est produit réessayer s'il vous plait",
                        icon: "warning",
                        button: "D'accord",
                        closeOnClickOutside: false,
                        dangerMode: true,
                    });
                }

                // if (response.resultat.length > 0) {

                // }

            })
            .catch((error) => {
                document.getElementById('my_spinner').style.display = 'none'

                swal({
                    title: "erreur",
                    text: "Une erreur 's'est produit réessayer s'il vous plait",
                    icon: "warning",
                    button: "D'accord",
                    closeOnClickOutside: false,
                    dangerMode: true,
                });

                console.log(error)
            });
    }







})


document.getElementById('btn_createçcompte').addEventListener('click', function (e) {
    e.preventDefault()
    document.location.href = 'register.html'
})



var PREMIER_CHARGEMENT = Array()









function verifier_user() {


    let USER = window.localStorage.getItem('id_chat_user_bewell')

    console.log(USER)
    if (USER == "" || USER == null) {
        document.location.href = 'login.html'
    }
    else {



        console.log(USER)

        let les_donnees = new FormData();

        les_donnees.append("pseudo", USER);

        fetch(URL + "/information_personnel", {
            method: "POST",
            body: les_donnees,
        })
            .then((response) => response.json())
            .then((response) => {

                console.log(response.resultat)

                if (response.resultat.length > 0) {

                }
                else {
                    document.location.href = 'login.html'
                }

            })
            .catch((error) => {
                console.log(error)
            });

    }
}



// $(".emoji_input").emojioneArea(
//     {
//         pickerPosition: "top",
//         toneStyle: "bullet"
//     }
// );

document.body.classList.toggle('dark-mode');



function updatePreview(input, target) {
    let file = input.files[0];



    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {
        let img = document.getElementById(target);
        // can also use "this.result"
        img.src = reader.result;
    }
}






// var USER_NAME = window.localStorage.getItem('id_chat_user_bewell')
var USER_NAME = ""

var BASE_USER = Array()  //  base de donnne des utilisateur


var ID_SELECT = Array()  //  variable id user selectionner -> int
var NOM_DU_GROUPE = Array()  //  variable noom du groupe
var ID_DISCUSSIONS_GROUPE = Array()  //  variable noom du groupe





document.querySelector('.add').addEventListener('click', function (params) {


    // alert('frfr')


    let les_donnees = new FormData();

    les_donnees.append("pseudo", USER_NAME);

    fetch(URL + "/all_user", {
        method: "POST",
        body: les_donnees,
    })
        .then((response) => response.json())
        .then((response) => {


            let les_utilisateur = []
            let mes_amis_actuel = []










            document.getElementById('user_liste').innerHTML = ''

            if (response.resultat == 'admin') {
                $('#choisir_type').modal({
                    show: true,
                    keyboard: false,
                    backdrop: 'static'
                })
            } else {
                let nbr = 0
                // gerer sauvegarder le sutilisateur

                response.all_users.forEach(element_2 => {
                    if (element_2.type != "groupe" && element_2.pseudo != USER_NAME) {
                        les_utilisateur.push(element_2)
                    }

                });

                // recuperation des amis
                response.mes_amis.forEach(element_2 => {
                    if (element_2.emetteur == USER_NAME || element_2.recepteur == USER_NAME) {
                        mes_amis_actuel.push(element_2)
                    }
                });



                const filteredResults = les_utilisateur.filter(item =>
                    mes_amis_actuel.every(val => item.pseudo != val.emetteur && item.pseudo != val.recepteur)
                );


                console.log(les_utilisateur)
                console.log(mes_amis_actuel)

                console.log(filteredResults);





                // #######################


                filteredResults.forEach(element_2 => {

                    nbr++
                    let id_ligne = "id_ligne_" + element_2.id

                    let row_1 = `
                                <tr id="${id_ligne}">
                                <td>${element_2.pseudo}</td>
                                <td> <button class="btn btn-primary" onclick=recupere_recepteur(${element_2.id})> inviter  </button> </td>
                            </tr>`

                    document.getElementById('user_liste').innerHTML += row_1

                });

                $('#user_invitation').modal({
                    show: true,
                    keyboard: false,
                    backdrop: 'static'
                })
            }















            // response.resultat.forEach(element => {

            //     if (element.role == 'admin') {
            //         $('#choisir_type').modal({
            //             show: true,
            //             keyboard: false,
            //             backdrop: 'static'
            //         })
            //     } else {

            //         let nbr = 0
            //         response.all_users.forEach(element_2 => {
            //             if (element_2.type != "groupe" && element_2.pseudo != USER_NAME) {


            //                 nbr++
            //                 let id_ligne = "id_ligne_" + element_2.id

            //                 let row_1 = `
            //                     <tr id="${id_ligne}">
            //                      <td>${element_2.pseudo}</td>
            //                     <td> <button class="btn btn-primary" onclick=recupere_recepteur(${element_2.id})> inviter  </button> </td>
            //                 </tr>`

            //                 document.getElementById('user_liste').innerHTML += row_1

            //             }
            //         });


            //         $('#user_invitation').modal({
            //             show: true,
            //             keyboard: false,
            //             backdrop: 'static'
            //         })



            //     }

            // });

        })
        .catch((error) => {
            console.log(error)
        });



})



var pseudo_receiver = Array()



function recupere_recepteur(params) {

    pseudo_receiver = []

    fetch(URL + "/rechercher_user", {
        method: "POST",
    })
        .then((response) => response.json())
        .then((response) => {

            response.resultat.forEach(element => {
                if (element.id == params) {
                    pseudo_receiver[0] = element.pseudo

                    send_invitation()

                    let id_ligne = "id_ligne_" + params

                    let row_1 = `
                    
                     <td>${element.pseudo}</td>
                    <td> <button class="btn btn-success"  > envoyé  </button> </td>
                 `

                    document.getElementById(id_ligne).innerHTML = row_1

                }
            });
            // console.log(response)

        })
        .catch((error) => {
            console.log(error)
        });


}





function send_invitation() {


    let les_donnees = new FormData();

    les_donnees.append("emetteur", USER_NAME);
    les_donnees.append("recepteur", pseudo_receiver[0]);



    fetch(URL + "/send_invatation", {
        method: "POST",
        body: les_donnees,
    })
        .then((response) => response.json())
        .then((response) => {


            // if (response.resultat == "save") {
            //     swal({
            //         title: "Envoyé",
            //         text: "Votre invitation à été envoyé avec succès",
            //         icon: "success",

            //     });
            // }

            // if (response.resultat == "deja_invite") {
            //     swal({
            //         title: "erreur",
            //         text: "Invitation existant entre vous ",
            //         icon: "warning",

            //     });
            // }
            // console.log(response)

        })
        .catch((error) => {
            console.log(error)
        });


}













document.getElementById('btn_create_user').addEventListener('click', function (params) {
    $('#choisir_type').modal("hide")

    // $('#create_user').modal({
    //     show: true,
    //     keyboard: false,
    //     backdrop: 'static'
    // })




    let les_donnees = new FormData();

    les_donnees.append("pseudo", USER_NAME);

    fetch(URL + "/all_user", {
        method: "POST",
        body: les_donnees,
    })
        .then((response) => response.json())
        .then((response) => {


            document.getElementById('user_liste').innerHTML = ''



            response.resultat.forEach(element => {



                let nbr = 0
                response.all_users.forEach(element_2 => {
                    if (element_2.type != "groupe" && element_2.pseudo != USER_NAME) {


                        nbr++

                        let row_1 = `
                                <tr> 
                                <td>${element_2.pseudo}</td>
                                <td> <button class="btn btn-primary" onclick=recupere_recepteur(${element_2.id})> envoyer  </button> </td>
                            </tr>`

                        document.getElementById('user_liste').innerHTML += row_1

                    }
                });


                $('#user_invitation').modal({
                    show: true,
                    keyboard: false,
                    backdrop: 'static'
                })





            });

        })
        .catch((error) => {
            console.log(error)
        });



})




document.getElementById('btn_create_group').addEventListener('click', function (params) {
    $('#choisir_type').modal("hide")
    $('#create_group').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    })
})






document.getElementById('btn_choose_member').addEventListener('click', function (params) {
    $('#create_group').modal("hide")





    let image = document.getElementById('imageg').value.trim();

    let nom_group = document.getElementById('nom_group').value.trim()

    if (nom_group == "") {
        swal({
            title: "erreur",
            text: "Le nom du groupe est  obligatoire",
            icon: "error",
            button: "D'accord",
            closeOnClickOutside: false,
            dangerMode: true,
        });
    } else {


        let les_donnees = new FormData()

        if (image == "") {


            les_donnees.append('pseudo', nom_group)
            les_donnees.append('admin', USER_NAME)
            les_donnees.append('image', '')

            fetch(URL + '/creer_compte_groupe', {
                method: 'POST',
                body: les_donnees,
                headers: {
                    Accept: "application/json",

                }
            }).then(response => response.json())
                .then(response => {




                    NOM_DU_GROUPE[0] = response.nom_groupe
                    ID_DISCUSSIONS_GROUPE[0] = response.id_discussion_group


                    document.getElementById('liste_member_choisir').innerHTML = ''







                    let nbr = 0
                    response.all_users.forEach(element_2 => {
                        if (element_2.type != 'groupe' && element_2.pseudo != USER_NAME && element_2.pseudo != response.nom_groupe) {

                            nbr++

                            let rwo_group = "rwo_group_" + element_2.id

                            let row_1 = `
                                        <tr>
                                         <td>${element_2.pseudo}</td>
                                        <td id="${rwo_group}"> <button class="btn btn-primary" onclick=envoye_invitation(${element_2.id})> envoyer  </button> </td>
                                    </tr>`

                            document.getElementById('liste_member_choisir').innerHTML += row_1

                        }
                    });


                    $('#choisir_membre').modal({
                        show: true,
                        keyboard: false,
                        backdrop: 'static'
                    })





                })
                .catch((error) => {
                    // console.log(error)
                    // loader(false)
                    error_internet()
                });
        }
        // ###############################################
        // ###############################################
        else {

            let le_fichier = document.getElementById('imageg').files[0]
            let nom_image = le_fichier.name;
            let extenssion_image = nom_image.split('.').pop().toLowerCase();
            if (jQuery.inArray(extenssion_image, ['jpeg', 'jpg', 'png', , 'gif']) == -1) {

                swal({
                    title: "Erreur image",
                    text: "Le format de l'image est incorrecte",
                    icon: "error",
                    button: "Ok",
                });


            } else {

                les_donnees.append('pseudo', nom_group)
                les_donnees.append('admin', USER_NAME)
                les_donnees.append('image', le_fichier)



                fetch(URL + '/creer_compte_groupe', {
                    method: 'POST',
                    body: les_donnees,
                    headers: {
                        Accept: "application/json",

                    }
                }).then(response => response.json())
                    .then(response => {


                        NOM_DU_GROUPE[0] = response.nom_groupe
                        ID_DISCUSSIONS_GROUPE[0] = response.id_discussion_group

                        document.getElementById('liste_member_choisir').innerHTML = ''







                        let nbr = 0
                        response.all_users.forEach(element_2 => {
                            if (element_2.type != 'groupe' && element_2.pseudo != USER_NAME && element_2.pseudo != response.nom_groupe) {

                                let rwo_group = "rwo_group_" + element_2.id
                                nbr++

                                let row_1 = `
                                        <tr>
                                         <td>${element_2.pseudo}</td>
                                        <td id="${rwo_group}"> <button class="btn btn-primary" onclick=envoye_invitation(${element_2.id})> envoyer  </button> </td>
                                    </tr>`

                                document.getElementById('liste_member_choisir').innerHTML += row_1

                            }
                        });


                        $('#choisir_membre').modal({
                            show: true,
                            keyboard: false,
                            backdrop: 'static'
                        })


                    })
                    .catch((error) => {
                        // console.log(error)
                        // loader(false)
                        error_internet()
                    });
            }
        }







    }



})









function envoye_invitation(params) {


    let les_donnees = new FormData()

    les_donnees.append('emetteur', NOM_DU_GROUPE[0])
    les_donnees.append('id_discussion', ID_DISCUSSIONS_GROUPE[0])
    les_donnees.append('id', params)

    fetch(URL + '/send_invatation_groupe', {
        method: 'POST',
        body: les_donnees,
        headers: {
            Accept: "application/json",

        }
    }).then(response => response.json())
        .then(response => {

            if (response.resultat == "save") {
                let rwo_group = "rwo_group_" + params

                document.getElementById(rwo_group).innerHTML = `
                <button class="btn btn-success"  > Intégré  </button>
                `
                // swal({
                //     title: "Envoyé",
                //     text: "Utilisateur ajouter",
                //     icon: "success",

                // });
            }

            if (response.resultat == "deja_invite") {
                swal({
                    title: "erreur",
                    text: "l'utilisateru est dans le goupe ",
                    icon: "warning",

                });
            }

        })
        .catch((error) => {
            // error_internet()
        });
}






function information_personnel() {

    console.log(USER_NAME)

    let les_donnees = new FormData();

    les_donnees.append("pseudo", USER_NAME);

    fetch(URL + "/information_personnel", {
        method: "POST",
        body: les_donnees,
    })
        .then((response) => response.json())
        .then((response) => {

            document.getElementById('content_user_info').innerHTML = ''
            console.log(response.resultat)

            response.resultat.forEach(element => {

                let src_img = ''
                if (element.profile == '') {
                    src_img += `<img id="image-preview" src="./user_male_circle_30px.png"
                    style="margin-bottom: 10px;    width:100px; height: 100px;" class="rounded rounded-circle"
                    alt="placeholder">`
                } else {
                    src_img += `<img id="image-preview" src="${URL_FILE + "/" + element.profile}"  style="margin-bottom: 10px;    width:100px; height: 100px;" class="rounded rounded-circle"
                    alt="placeholder">`
                }



                let row = `
                <div class="msg-profile group" style="width: 100px !important;">
                `+ src_img + `
                 
              </div>
              <div class="detail-title"> ${element.pseudo} </div>
    `
                document.getElementById('content_user_info').innerHTML = row

                // document.getElementById('content_user_info').insertAdjacentHTML('afterbegin', row)
            });

        })
        .catch((error) => {
            console.log(error)
        });
}









function mes_invitation() {
    let les_donnees = new FormData();

    les_donnees.append("recepteur", USER_NAME);



    fetch(URL + "/mes_invitation", {
        method: "POST",
        body: les_donnees,
    })
        .then((response) => response.json())
        .then((response) => {

            // console.log(response)

            document.getElementById('count_notif').innerHTML = response.resultat.length

        })
        .catch((error) => {
            console.log(error)
        });


}





document.getElementById('voir_invitation').addEventListener('click', function (params) {

    let les_donnees = new FormData();

    les_donnees.append("recepteur", USER_NAME);

    fetch(URL + "/mes_invitation", {
        method: "POST",
        body: les_donnees,
    })
        .then((response) => response.json())
        .then((response) => {



            if (response.resultat.length > 0) {
                document.getElementById('user_invitation_2').innerHTML = ''

                let nbr = 0

                response.resultat.forEach(element_2 => {

                    nbr++

                    let row_1 = `
                        <tr id="tr_invite_${element_2.id}">
                        <th scope="row">${nbr}</th>
                        <td>${element_2.emetteur}</td>
                        <td> <button class="btn btn-primary" onclick=accepter_invitation(${nbr},${element_2.id})> Accepter  </button> </td>
                    </tr>`


                    document.getElementById('user_invitation_2').innerHTML += row_1
                });


                $('#mes_invitation').modal({
                    show: true,
                    keyboard: false,
                    backdrop: 'static'
                })
            }


        })
        .catch((error) => {
            console.log(error)
        });

})







function accepter_invitation(numero_row, params) {


    let les_donnees = new FormData();

    les_donnees.append("id", params);



    fetch(URL + "/valider_invitation", {
        method: "POST",
        body: les_donnees,
    })
        .then((response) => response.json())
        .then((response) => {

            console.log(response)
            if (response.resultat == 'save') {
                response.row_invitation.forEach(element_2 => {
                    let row_1 = `
                     
                    <th scope="row">${numero_row}</th>
                    <td>${element_2.emetteur}</td>
                    <td> <button class="btn btn-success"  > Ami  </button> </td>
               `


                    document.getElementById('tr_invite_' + params).innerHTML = row_1
                });
            }

        })
        .catch((error) => {
            console.log(error)
        });

}








function Cut_word(phraes) {
    if (phraes.length > 20) {
        let cut = phraes.substring(0, 20) + '...';
        return cut
    }
    else return phraes
}






function mes_amis() {


    if (PREMIER_CHARGEMENT.length == 0) {
        document.getElementById('liste_des_amis').innerHTML = ' '
        document.getElementById('liste_des_amis').innerHTML = `
            <div class="d-flex justify-content-center"  >
            <div class="spinner-border text-warning" role="status" id="my_spinnerss">    </div>
            </div>
            `
    }


    let les_donnees = new FormData();

    les_donnees.append("emetteur", USER_NAME);






    fetch(URL + "/mes_amis", {
        method: "POST",
        body: les_donnees,
    })
        .then((response) => response.json())
        .then(async (response) => {


            if (response.resultat.length == 0) {
                document.getElementById('liste_des_amis').innerHTML = ' '
                PREMIER_CHARGEMENT.push("1")
            }
            if (response.resultat.length > 0) {
                PREMIER_CHARGEMENT.push("1")

                if (BASE_USER.length > 0) {


                    let recherche = response.resultat.filter(o1 => !BASE_USER.some(o2 =>
                        o1.last_message === o2.last_message,
                    ));
                    let recherche_2 = response.resultat.filter(o1 => !BASE_USER.some(o2 =>
                        o1.non_lu_emetteur === o2.non_lu_emetteur
                    ));
                    let recherche_3 = response.resultat.filter(o1 => !BASE_USER.some(o2 =>
                        o1.non_lu_recepteur === o2.non_lu_recepteur
                    ));


                    if (recherche.length > 0 || recherche_2.length > 0 || recherche_3.length > 0) {






                        BASE_USER = []
                        response.resultat.forEach(element_reche => {
                            BASE_USER.push(element_reche)
                        });


                        document.getElementById('liste_des_amis').innerHTML = ''

                        response.resultat.forEach(element_1 => {


                            if (element_1.emetteur == USER_NAME) {

                                response.all_user.forEach(element_2 => {

                                    if (element_1.recepteur == element_2.pseudo) {

                                        let span = element_1.non_lu_emetteur > 0 && element_1.recepteur != PSEUDO_RECEPTEUR[0] ? `
                                        <span id='count_non_lu_${element_1.id_discussion}' class="msg-date" style="color:#fff;height:20px;width:20px;
                                        background-color: red; text-align: center;border-radius: 10px;
                                        margin-left:10px
                                        ">
                                        ${element_1.non_lu_emetteur}</span>` : `<span id='count_non_lu_${element_1.id_discussion}'></span> `




                                        let row = `
                                    <div class="mes-row-user msg  design_${element_1.id_discussion} " onclick="check_message(${element_1.id_discussion})" >
                                    <img class="msg-profile" src="${URL_FILE + "/" + element_2.profile}"
                                      alt="" />
                                    <div class="msg-detail">
                                      <div class="msg-username mes_row">${element_2.pseudo}</div>
                                      <div class="msg-content">
                                        <span class="msg-message">${Cut_word(element_1.last_message)}</span>

                                        ${span}


                                      </div>
                                    </div>
                                  </div>
                                    `

                                        document.getElementById('liste_des_amis').insertAdjacentHTML('afterbegin', row)


                                    }





                                });

                            }

                            if (element_1.recepteur == USER_NAME) {

                                response.all_user.forEach(element_2 => {

                                    if (element_1.emetteur == element_2.pseudo) {


                                        let span = element_1.non_lu_recepteur > 0 && element_1.emetteur != PSEUDO_RECEPTEUR[0] ? `
                                        <span id='count_non_lu_${element_1.id_discussion}' class="msg-date" style="color:#fff;height:20px;width:20px;
                                        background-color: red; text-align: center;border-radius: 10px;
                                        margin-left:10px
                                        ">
                                        ${element_1.non_lu_recepteur}</span>` : `<span id='count_non_lu_${element_1.id_discussion}'></span> `



                                        let row = `
                                            <div class="mes-row-user msg  design_${element_1.id_discussion} " onclick="check_message(${element_1.id_discussion})" >
                                            <img class="msg-profile" src="${URL_FILE + "/" + element_2.profile}"
                                            alt="" />
                                            <div class="msg-detail">
                                            <div class="msg-username mes_row">${element_2.pseudo}</div>
                                            <div class="msg-content">
                                                <span class="msg-message">${Cut_word(element_1.last_message)}</span>
                                            
                                                ${span}
                                            </div>
                                            </div>
                                        </div>
                                            `

                                        document.getElementById('liste_des_amis').insertAdjacentHTML('afterbegin', row)


                                    }





                                });

                            }


                        });



                    }








                    // let recherche_2 = response.resultat.filter(o1 => !BASE_USER.some(o2 =>
                    //     o1.non_lu_emetteur === o2.non_lu_emetteur
                    // ));

                    // if (recherche_2.length > 0) {





                    //     BASE_USER = []
                    //     response.resultat.forEach(element_reche => {
                    //         BASE_USER.push(element_reche)
                    //     });


                    //     document.getElementById('liste_des_amis').innerHTML = ''

                    //     response.resultat.forEach(element_1 => {


                    //         if (element_1.emetteur == USER_NAME) {

                    //             response.all_user.forEach(element_2 => {

                    //                 if (element_1.recepteur == element_2.pseudo) {

                    //                     let span = element_1.non_lu_emetteur > 0 ? `
                    //                     <span id='count_non_lu_${element_1.id_discussion}' class="msg-date" style="color:#fff;height:20px;width:20px;
                    //                     background-color: red; text-align: center;border-radius: 10px;
                    //                     margin-left:10px
                    //                     ">
                    //                     ${element_1.non_lu_emetteur}</span>` : `<span id='count_non_lu_${element_1.id_discussion}'></span> `




                    //                     let row = `
                    //                 <div class="msg  design_${element_1.id_discussion}" onclick="check_message(${element_1.id_discussion})" >
                    //                 <img class="msg-profile" src="${URL_FILE + "/" + element_2.profile}"
                    //                   alt="" />
                    //                 <div class="msg-detail">
                    //                   <div class="msg-username">${element_2.pseudo}</div>
                    //                   <div class="msg-content">
                    //                     <span class="msg-message">${Cut_word(element_1.last_message)}</span>

                    //                     ${span}


                    //                   </div>
                    //                 </div>
                    //               </div>
                    //                 `

                    //                     document.getElementById('liste_des_amis').insertAdjacentHTML('afterbegin', row)


                    //                 }





                    //             });

                    //         }

                    //         if (element_1.recepteur == USER_NAME) {

                    //             response.all_user.forEach(element_2 => {

                    //                 if (element_1.emetteur == element_2.pseudo) {


                    //                     let span = element_1.non_lu_recepteur > 0 ? `
                    //                     <span id='count_non_lu_${element_1.id_discussion}' class="msg-date" style="color:#fff;height:20px;width:20px;
                    //                     background-color: red; text-align: center;border-radius: 10px;
                    //                     margin-left:10px
                    //                     ">
                    //                     ${element_1.non_lu_recepteur}</span>` : `<span id='count_non_lu_${element_1.id_discussion}'></span> `



                    //                     let row = `
                    //                         <div class="msg  design_${element_1.id_discussion}" onclick="check_message(${element_1.id_discussion})" >
                    //                         <img class="msg-profile" src="${URL_FILE + "/" + element_2.profile}"
                    //                         alt="" />
                    //                         <div class="msg-detail">
                    //                         <div class="msg-username">${element_2.pseudo}</div>
                    //                         <div class="msg-content">
                    //                             <span class="msg-message">${Cut_word(element_1.last_message)}</span>

                    //                             ${span}
                    //                         </div>
                    //                         </div>
                    //                     </div>
                    //                         `

                    //                     document.getElementById('liste_des_amis').insertAdjacentHTML('afterbegin', row)


                    //                 }





                    //             });

                    //         }


                    //     });



                    // }






                    // let recherche_3 = response.resultat.filter(o1 => !BASE_USER.some(o2 =>
                    //     o1.non_lu_recepteur === o2.non_lu_recepteur
                    // ));

                    // if (recherche_3.length > 0) {





                    //     BASE_USER = []
                    //     response.resultat.forEach(element_reche => {
                    //         BASE_USER.push(element_reche)
                    //     });


                    //     document.getElementById('liste_des_amis').innerHTML = ''

                    //     response.resultat.forEach(element_1 => {


                    //         if (element_1.emetteur == USER_NAME) {

                    //             response.all_user.forEach(element_2 => {

                    //                 if (element_1.recepteur == element_2.pseudo) {

                    //                     let span = element_1.non_lu_emetteur > 0 ? `
                    //                     <span id='count_non_lu_${element_1.id_discussion}' class="msg-date" style="color:#fff;height:20px;width:20px;
                    //                     background-color: red; text-align: center;border-radius: 10px;
                    //                     margin-left:10px
                    //                     ">
                    //                     ${element_1.non_lu_emetteur}</span>` : `<span id='count_non_lu_${element_1.id_discussion}'></span> `




                    //                     let row = `
                    //                 <div class="msg  design_${element_1.id_discussion}" onclick="check_message(${element_1.id_discussion})" >
                    //                 <img class="msg-profile" src="${URL_FILE + "/" + element_2.profile}"
                    //                   alt="" />
                    //                 <div class="msg-detail">
                    //                   <div class="msg-username">${element_2.pseudo}</div>
                    //                   <div class="msg-content">
                    //                     <span class="msg-message">${Cut_word(element_1.last_message)}</span>

                    //                     ${span}


                    //                   </div>
                    //                 </div>
                    //               </div>
                    //                 `

                    //                     document.getElementById('liste_des_amis').insertAdjacentHTML('afterbegin', row)


                    //                 }





                    //             });

                    //         }

                    //         if (element_1.recepteur == USER_NAME) {

                    //             response.all_user.forEach(element_2 => {

                    //                 if (element_1.emetteur == element_2.pseudo) {


                    //                     let span = element_1.non_lu_recepteur > 0 ? `
                    //                     <span id='count_non_lu_${element_1.id_discussion}' class="msg-date" style="color:#fff;height:20px;width:20px;
                    //                     background-color: red; text-align: center;border-radius: 10px;
                    //                     margin-left:10px
                    //                     ">
                    //                     ${element_1.non_lu_recepteur}</span>` : `<span id='count_non_lu_${element_1.id_discussion}'></span> `



                    //                     let row = `
                    //                         <div class="msg  design_${element_1.id_discussion}" onclick="check_message(${element_1.id_discussion})" >
                    //                         <img class="msg-profile" src="${URL_FILE + "/" + element_2.profile}"
                    //                         alt="" />
                    //                         <div class="msg-detail">
                    //                         <div class="msg-username">${element_2.pseudo}</div>
                    //                         <div class="msg-content">
                    //                             <span class="msg-message">${Cut_word(element_1.last_message)}</span>

                    //                             ${span}
                    //                         </div>
                    //                         </div>
                    //                     </div>
                    //                         `

                    //                     document.getElementById('liste_des_amis').insertAdjacentHTML('afterbegin', row)


                    //                 }





                    //             });

                    //         }


                    //     });



                    // }





                }








                else {




                    document.getElementById('liste_des_amis').innerHTML = ''
                    response.resultat.forEach(element_1 => {

                        BASE_USER.push(element_1)

                        console.log(element_1)

                        if (element_1.emetteur == USER_NAME) {

                            response.all_user.forEach(element_2 => {

                                if (element_1.recepteur == element_2.pseudo) {


                                    let span = element_1.non_lu_emetteur > 0 && element_1.recepteur != PSEUDO_RECEPTEUR[0] ? `
                                    <span id='count_non_lu_${element_1.id_discussion}' class="msg-date" style="color:#fff;height:20px;width:20px;
                                    background-color: red; text-align: center;border-radius: 10px;
                                    margin-left:10px
                                    ">
                                    ${element_1.non_lu_emetteur}</span>` : `<span id='count_non_lu_${element_1.id_discussion}'></span> `





                                    let row = `
                                        <div id="le_tchat${element_1.id_discussion}" class="msg  design_${element_1.id_discussion}" onclick="check_message(${element_1.id_discussion})" >
                                                <img class="msg-profile" src="${URL_FILE + "/" + element_2.profile}"
                                                alt="" />
                                                <div class="msg-detail">
                                                <div class="msg-username">${element_2.pseudo}</div>
                                                <div class="msg-content">
                                                    <span class="msg-message">${Cut_word(element_1.last_message)}</span>
                                                    ${span}
                                                </div>
                                                </div>
                                        </div>
                                        `

                                    document.getElementById('liste_des_amis').insertAdjacentHTML('afterbegin', row)


                                }





                            });

                        }

                        if (element_1.recepteur == USER_NAME) {

                            response.all_user.forEach(element_2 => {

                                if (element_1.emetteur == element_2.pseudo) {

                                    let span = element_1.non_lu_recepteur > 0 && element_1.emetteur != PSEUDO_RECEPTEUR[0] ? `
                                    <span id='count_non_lu_${element_1.id_discussion}' class="msg-date" style="color:#fff;height:20px;width:20px;
                                    background-color: red; text-align: center;border-radius: 10px;
                                    margin-left:10px
                                    ">
                                    ${element_1.non_lu_recepteur}</span>` : `<span id='count_non_lu_${element_1.id_discussion}'></span> `




                                    let row = `
                                        <div class="msg  design_${element_1.id_discussion}" id="le_tchat${element_1.id_discussion}"  onclick="check_message(${element_1.id_discussion})" >
                                        <img class="msg-profile" src="${URL_FILE + "/" + element_2.profile}"
                                        alt="" />
                                        <div class="msg-detail">
                                        <div class="msg-username">${element_2.pseudo}</div>
                                        <div class="msg-content">
                                            <span class="msg-message">${Cut_word(element_1.last_message)}</span>
                                        
                                            ${span} 
                                        </div>
                                        </div>
                                    </div>
                                `

                                    document.getElementById('liste_des_amis').insertAdjacentHTML('afterbegin', row)

                                }





                            });

                        }


                    });


                }

            }


            if (ID_SELECT.length > 0) {
                document.querySelector('.design_' + ID_SELECT[0]).classList.add('active')

            }


        })
        .catch((error) => {

            console.log(error)
        });
}




async function check_notification(params) {



    params.resultat.forEach(element_1 => {



        if (element_1.emetteur == USER_NAME) {

            response.all_user.forEach(async element_2 => {

                if (element_1.recepteur == element_2.pseudo) {


                    let span = element_1.non_lu_emetteur > 0 && element_1.recepteur != PSEUDO_RECEPTEUR[0] ?
                        await window.electron.nouvelle_notification() : null



                }





            });

        }

        if (element_1.recepteur == USER_NAME) {

            response.all_user.forEach(async element_2 => {

                if (element_1.emetteur == element_2.pseudo) {

                    let span = element_1.non_lu_recepteur > 0 && element_1.emetteur != PSEUDO_RECEPTEUR[0] ?
                        await window.electron.nouvelle_notification() : null




                }





            });

        }


    });


}









document.getElementById('btn_deconnexion').addEventListener('click', function (params) {



    swal({
        title: "Déconnection?",
        text: "Voullez vous déconnecter ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                // window.localStorage.setItem('id_chat_user_bewell', '')

                // document.location.href = 'login.html'

                $('#login_modal').modal('show')

            }
        });
})




// document.getElementById('contenneur_messages').innerHTML = `
// <div class="d-flex justify-content-center" >
// <div class="spinner-border text-primary" role="status">    </div>
// </div>
// `






document.getElementById("search_user").addEventListener('keyup', function (params) {

    let mot_cle = document.getElementById("search_user").value.trim()


    // BASE_USER.forEach(element => {
    //     console.log(element)
    // });


    let exprex_reg_nom = '\\b(.*)(' + mot_cle + ')(.*)\\b'

    let donnee = BASE_USER.filter((element) => {

        if (element.emetteur == USER_NAME) {
            return element.recepteur.match(new RegExp(exprex_reg_nom, 'i'))
        }

        if (element.recepteur == USER_NAME) {
            return element.emetteur.match(new RegExp(exprex_reg_nom, 'i'))
        }

    }
    );
    if (donnee.length > 0) {


        // donnee.forEach(element => {
        //     BASE_USER.forEach(element_2 => {
        //         let my_row = "le_tchat" + element.id_discussion

        //         if (element.id_discussion == element_2.id_discussion) {
        //             document.getElementById(my_row).style.display = "none"
        //         } else {
        //             document.getElementById(my_row).style.display = "block"
        //         }
        //     });
        // });



        // console.log(lengthOfArray)

    }
    else {
        // BASE_RESULTAT = []
    }



})