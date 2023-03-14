$(document).ready(function () {
    setInterval(() => {
        recuperer_messages()
    }, 1500);

    getColor()
    getTheme()
});


var ID_DISCUSSIONS = Array()  //  ID DE DISCUSSION
var TYPE_DISCUSSION = Array()  //  TYPE DE DISCUSSION
var ID_DISCUSSIONS = Array()  //  ID DE DISCUSSION
var PSEUDO_RECEPTEUR = Array()  //  PSEUDO E DU RECEPTEUR
var BASE_DISCUSSION = Array()  //  base de donnne de discussion



document.getElementById('btn_darck').addEventListener('click', function (params) {

    let mon_theme = window.localStorage.getItem('theme_chat_user_bewell')

    console.log('mon_theme')
    console.log(mon_theme)

    if (mon_theme == 1 || mon_theme == 'null') {
        document.body.classList.toggle('dark-mode');
        window.localStorage.setItem('theme_chat_user_bewell', 0)
    }
    if (mon_theme == 0) {
        document.body.classList.toggle('dark-mode');
        window.localStorage.setItem('theme_chat_user_bewell', 1)
    }

})





function getTheme() {

    let mon_theme = window.localStorage.getItem('theme_chat_user_bewell')
    console.log('mon theme')
    console.log(mon_theme)

    if (mon_theme == 1) {
        document.body.classList.toggle('dark-mode');
    }

}




function getColor() {

    let la_couleur = window.localStorage.getItem('color_chat_user_bewell')

    document.getElementById('' + la_couleur + '').className = ''
    document.getElementById('' + la_couleur + '').className = 'color ' + la_couleur + ' selected'

    document.body.setAttribute('data-theme', la_couleur);

}





function check_message(params) {

    BASE_DISCUSSION = []


    document.getElementById('contenneur_messages').innerHTML = ' '
    document.getElementById('contenneur_messages').innerHTML = `
    <div class="d-flex justify-content-center"  >
    <div class="spinner-border text-primary" role="status" id="my_spinnerss">    </div>
    </div>
    `

    ID_SELECT[0] = params


    let btn_choix = document.querySelectorAll('.msg');

    for (let j = 0; j < btn_choix.length; j++) {
        btn_choix[j].classList.remove('active')
    }

    document.querySelector('.design_' + params).classList.add('active')






    ID_DISCUSSIONS[0] = params


    let les_donnees = new FormData();

    les_donnees.append("recepteur", USER_NAME);
    les_donnees.append("id_discussion", params);


    fetch(URL + "/check_message", {
        method: "POST",
        body: les_donnees,
    })
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            document.getElementById('count_non_lu_' + params + '').style.display = 'none'



            // if (response.resultat.length > 0) {

            // }
            // else {

            // }




            response.recepteur_info.forEach(element => {

                TYPE_DISCUSSION[0] = element.type

                if (element.emetteur == USER_NAME) {
                    PSEUDO_RECEPTEUR[0] = element.recepteur

                }
                if (element.recepteur == USER_NAME) {
                    PSEUDO_RECEPTEUR[0] = element.emetteur

                }
            });


        })
        .catch((error) => {
            console.log(error)
        });

}







$(document).on('keypress', function (e) {
    if (e.which == 13) {
        // alert('You pressed enter!');
        send_msg()
    }
});





function send_msg() {

    let message = document.getElementById('message_text').value.trim()

    if (PSEUDO_RECEPTEUR.length == 0) {
        swal({
            title: "erreur",
            text: "Sélectionnez un compte pour aborder la discussion",
            icon: "warning",
            button: "D'accord",
            closeOnClickOutside: false,
            dangerMode: true,
        });
    }
    else {

        if (message == '') {
            swal({
                title: "erreur",
                text: "Saisissez un text",
                icon: "warning",
                button: "D'accord",
                closeOnClickOutside: false,
                dangerMode: true,
            });
        } else {




            let les_donnees = new FormData();


            if (TYPE_DISCUSSION[0] == 'user') {


                let total = document.getElementById('ajouter_image').files.length
                if (total > 0) {
                    for (let b = 0; b < total; b++) {
                        les_donnees.append('fichier[]', document.getElementById('ajouter_image').files[b])
                    }

                } else {
                    les_donnees.append('fichier[]', '')
                }


                les_donnees.append("id_discussion", ID_DISCUSSIONS[0]);
                les_donnees.append("emetteur_msg", USER_NAME);
                les_donnees.append("recepteur_msg", PSEUDO_RECEPTEUR[0]);
                les_donnees.append("message", message);

                // for (let value of les_donnees) {
                //     console.log(value)
                // }

                fetch(URL + '/send_messages',
                    {
                        method: 'post',
                        body: les_donnees,
                        headers: {
                            // 'Content-Type': 'multipart/form-data',
                            Accept: "application/json",
                        }
                    }
                ).then(response => response.json())
                    .then(response => {

                        console.log(response)



                        if (response.resultat == 'save') {
                            document.getElementById('message_text').value = ''
                            document.getElementById('ajouter_image').value = ""
                            document.getElementById('content_image_send').style.display = "none"
                        } else {
                            // alert('error , réessayer')
                        }

                    })
                    .catch((error) => {

                        console.log(error);
                    });
            }





            if (TYPE_DISCUSSION[0] == 'groupe') {

                let total = document.getElementById('ajouter_image').files.length
                for (let b = 0; b < total; b++) {
                    les_donnees.append('fichier[]', document.getElementById('ajouter_image').files[b])
                }

                les_donnees.append("nom_groupe", PSEUDO_RECEPTEUR[0]);
                les_donnees.append("id_discussion", ID_DISCUSSIONS[0]);
                les_donnees.append("emetteur", USER_NAME);
                les_donnees.append("message", message);


                fetch(URL + '/send_messages_groupe',
                    {
                        method: 'post',
                        body: les_donnees,
                        headers: {
                            Accept: "application/json",
                        }
                    }
                ).then(response => response.json())
                    .then(response => {

                        if (response.resultat == 'save') {
                            document.getElementById('message_text').value = ''
                            document.getElementById('ajouter_image').value = ""
                            document.getElementById('content_image_send').style.display = "none"

                        }
                        if (response.resultat == 'user_delete_from_groupe') {
                            // alert('error , réessayer')
                            swal({
                                title: "erreur",
                                text: "Vous ne faite plus partie du groupe ",
                                icon: "warning",

                            });
                        }

                    })
                    .catch((error) => {

                        console.log(error);
                    });

            }











        }
    }
}






function recuperer_messages() {

    if (PSEUDO_RECEPTEUR.length == 0 || TYPE_DISCUSSION.length == 0) {

    }
    else {


        if (TYPE_DISCUSSION[0] == 'groupe') {



            let les_donnees = new FormData();

            les_donnees.append("nom_groupe", PSEUDO_RECEPTEUR[0]);
            les_donnees.append("emetteur", USER_NAME);
            les_donnees.append("id_discussion", ID_DISCUSSIONS[0]);

            fetch(URL + '/recuperer_messages_groupe',
                {
                    method: 'post',
                    body: les_donnees,
                    headers: {
                        Accept: "application/json",
                    }
                }
            ).then(response => response.json())
                .then(response => {


                    let total_member = response.membre_du_groupe.length

                    document.getElementById('titre_pseudo').innerHTML = PSEUDO_RECEPTEUR[0]

                    document.getElementById('total_membre').style.display = 'block'
                    document.getElementById('menu_goupe').style.display = 'block'

                    document.getElementById('total_membre').innerHTML = '+' + total_member


                    if (response.resultat.length > 0) {


                        if (BASE_DISCUSSION.length > 0) {


                            let recherche = response.resultat.filter(o1 => !BASE_DISCUSSION.some(o2 => o1.id === o2.id));

                            if (recherche.length > 0) {
                                BASE_DISCUSSION = []
                                response.resultat.forEach(element_reche => {
                                    BASE_DISCUSSION.push(element_reche)
                                });


                                document.getElementById('contenneur_messages').innerHTML = ''

                                response.resultat.forEach(element => {

                                    BASE_DISCUSSION.push(element)

                                    let les_images = ''

                                    if (element.image_msg_0 != '') {
                                        les_images += `
                                            <div class="chat-msg-text">
                                            <img
                                            src="${URL_FILE + '/' + element.image_msg_0}" />
                                            </div>
                                            `
                                    }
                                    if (element.image_msg_1 != '') {
                                        les_images += `
                                            <div class="chat-msg-text">
                                            <img
                                            src="${URL_FILE + '/' + element.image_msg_1}" />
                                            </div>
                                            `
                                    }


                                    let row = ''

                                    if (element.emetteur_msg == USER_NAME) {
                                        row += `
                                    <div class="chat-msg owner   me">
                                    
                                    <div class="chat-msg-content">
                                    ${les_images}
                                      <div class="chat-msg-text">${element.message}</div>
                                     </div>
                                  </div>
                                    `
                                    }
                                    else {
                                        row += `
                                    <div class="chat-msg  you">
                                        
                                    <div class="chat-msg-content">
                                    ${les_images}
                                    <div class="chat-msg-text">${element.message}.</div>
                                   
                                    </div>
                                    </div>
                                    `
                                    }



                                    document.getElementById('contenneur_messages').innerHTML += row







                                });

                                document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight



                            }






                        }
                        else {



                            document.getElementById('contenneur_messages').innerHTML = ''


                            response.resultat.forEach(element => {

                                BASE_DISCUSSION.push(element)

                                let les_images = ''

                                if (element.image_msg_0 != '') {
                                    les_images += `
                                        <div class="chat-msg-text">
                                        <img
                                        src="${URL_FILE + '/' + element.image_msg_0}" />
                                        </div>
                                        `
                                }
                                if (element.image_msg_1 != '') {
                                    les_images += `
                                        <div class="chat-msg-text">
                                        <img
                                        src="${URL_FILE + '/' + element.image_msg_1}" />
                                        </div>
                                        `
                                }

                                let row = ''

                                if (element.emetteur_msg == USER_NAME) {
                                    row += `
                                <div class="chat-msg owner   me">
                                
                                <div class="chat-msg-content">
                                ${les_images}
                                  <div class="chat-msg-text">${element.message} </div>
                                 </div>
                              </div>
                                `
                                }
                                else {
                                    row += `
                                <div class="chat-msg  you">
                                    
                                    <div class="chat-msg-content">
                                    ${les_images}
                                    <div class="chat-msg-text">${element.message}.</div>
                                   
                                    </div>
                                </div>
                                `
                                }



                                document.getElementById('contenneur_messages').innerHTML += row







                            });

                            document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight


                        }

                    }

                    const targetElement = document.querySelector('#my_spinnerss');

                    if (targetElement) {
                        document.getElementById('my_spinnerss').style.display = 'none'

                    }


                })
                .catch((error) => {

                    console.log(error);
                });

        }



        // #######################

        if (TYPE_DISCUSSION[0] == 'user') {

            document.getElementById('total_membre').style.display = 'none'
            document.getElementById('menu_goupe').style.display = 'none'

            document.getElementById('titre_pseudo').innerHTML = PSEUDO_RECEPTEUR[0]


            let les_donnees = new FormData();

            les_donnees.append("id_discussion", ID_DISCUSSIONS[0]);
            les_donnees.append("type_discussion", TYPE_DISCUSSION[0]);
            les_donnees.append("emetteur", USER_NAME);




            fetch(URL + '/recuperer_messages',
                {
                    method: 'post',
                    body: les_donnees,
                    headers: {
                        Accept: "application/json",
                    }
                }
            ).then(response => response.json())
                .then(response => {





                    if (response.resultat.length > 0) {


                        if (BASE_DISCUSSION.length > 0) {


                            let recherche = response.resultat.filter(o1 => !BASE_DISCUSSION.some(o2 => o1.id === o2.id));

                            if (recherche.length > 0) {
                                BASE_DISCUSSION = []
                                response.resultat.forEach(element_reche => {
                                    BASE_DISCUSSION.push(element_reche)
                                });


                                document.getElementById('contenneur_messages').innerHTML = ''

                                response.resultat.forEach(element => {

                                    BASE_DISCUSSION.push(element)

                                    let les_images = ''

                                    if (element.image_msg_0 != '') {
                                        les_images += `
                                            <div class="chat-msg-text">
                                            <img
                                            src="${URL_FILE + '/' + element.image_msg_0}" />
                                            </div>
                                            `
                                    }
                                    if (element.image_msg_1 != '') {
                                        les_images += `
                                            <div class="chat-msg-text">
                                            <img
                                            src="${URL_FILE + '/' + element.image_msg_1}" />
                                            </div>
                                            `
                                    }



                                    let row = ''

                                    if (element.emetteur_msg == USER_NAME) {
                                        row += `
                                    <div class="chat-msg owner   me">

                                    <div class="chat-msg-content">
                                    ${les_images}
                                      <div class="chat-msg-text">${element.message}</div>
                                     </div>
                                  </div>
                                    `
                                    }
                                    else {
                                        row += `
                                    <div class="chat-msg  you">

                                    <div class="chat-msg-content">
                                    ${les_images}
                                    <div class="chat-msg-text">${element.message}.</div>

                                    </div>
                                    </div>
                                    `
                                    }



                                    document.getElementById('contenneur_messages').innerHTML += row



                                    document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight + 100



                                });

                                document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight + 100



                            }






                        }
                        else {




                            document.getElementById('contenneur_messages').innerHTML

                            response.resultat.forEach((element, i) => {
                                let les_images = ''

                                if (element.image_msg_0 != '') {
                                    les_images += `
                                        <div class="chat-msg-text">
                                        <img
                                        src="${URL_FILE + '/' + element.image_msg_0}" />
                                        </div>
                                        `
                                }
                                if (element.image_msg_1 != '') {
                                    les_images += `
                                        <div class="chat-msg-text">
                                        <img
                                        src="${URL_FILE + '/' + element.image_msg_1}" />
                                        </div>
                                        `
                                }


                                BASE_DISCUSSION.push(element)

                                let row = ''

                                if (element.emetteur_msg == USER_NAME) {

                                    row += `
                                <div class="chat-msg owner   me">

                                    <div class="chat-msg-content">
                                    ${les_images}
                                    <div class="chat-msg-text">                             
                                            ${element.message} 
                                    </div>
                                    </div>

                                </div>
                                `
                                }
                                else {
                                    row += `
                                    <div class="chat-msg  you " >
                                        
                                        <div class="chat-msg-content">
                                        ${les_images}
                                        <div class="chat-msg-text">${element.message}.</div>

                                        </div>
                                    </div>
                                    `
                                }



                                document.getElementById('contenneur_messages').innerHTML += row



                                document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight + 100



                            });

                            document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight + 100


                        }

                    }


                    const targetElement = document.querySelector('#my_spinnerss');

                    if (targetElement) {
                        document.getElementById('my_spinnerss').style.display = 'none'

                    }

                })
                .catch((error) => {

                    console.log(error);
                });

        }
    }
}





// (function ($) {
//     'use strict';
//     $.contextMenu({
//         selector: '.context-menu-simple',
//         callback: function (key, options) {

//             // let id = options.$trigger.attr("id");
//             let my_class_name = options.$trigger.attr("class");
//             var m = "clicked: " + key;
//             if (key == "edit") {
//                 // Your_Function($(this).attr('id'));
//                 console.log(m)
//                 console.log(my_class_name)
//             }


//         },
//         items: {
//             "edit": {
//                 name: "Edit",

//             },
//             "cut": {
//                 name: "Cut",
//                 icon: "cut"
//             },
//             copy: {
//                 name: "Copy",
//                 icon: "copy"
//             },
//             "paste": {
//                 name: "Paste",
//                 icon: "paste"
//             },
//             "delete": {
//                 name: "Delete",
//                 icon: "delete",
//                 click: function () {
//                     console.log('message')
//                 }
//             },
//             "sep1": "---------",
//             "quit": {
//                 name: "Quit",
//                 icon: function () {
//                     console.log('message')
//                     return 'context-menu-icon context-menu-icon-quit';
//                 }
//             }
//         }
//     });

// })(jQuery);










document.getElementById('menu_goupe').addEventListener('click', function (params) {

    let les_donnees = new FormData();

    les_donnees.append("pseudo", USER_NAME);

    fetch(URL + "/all_user", {
        method: "POST",
        body: les_donnees,
    })
        .then((response) => response.json())
        .then((response) => {
            response.resultat.forEach(element => {

                if (element.role == 'admin') {
                    $('#menu_groupes').modal({
                        show: true,
                        keyboard: false,
                        backdrop: 'static'
                    })
                }

            });

        })
        .catch((error) => {
            console.log(error)
        });
})





document.getElementById('btn_add_orer_user').addEventListener('click', function (params) {

    $('#menu_groupes').modal("hide")

    let les_donnees = new FormData()

    les_donnees.append('nom_groupe', PSEUDO_RECEPTEUR[0])

    fetch(URL + '/liste_utilistaeur', {
        method: 'post',
        body: les_donnees,
        headers: {
            Accept: "application/json",

        }
    }).then(response => response.json())
        .then(response => {

            document.getElementById('user_invitation_3').innerHTML = ''





            let recherche = response.all_users.filter(o1 => !response.membre_du_groupe.some(o2 =>
                o1.pseudo === o2.emetteur,
            ));


            let nbr = 0
            recherche.forEach(element_2 => {
                if (element_2.type != 'groupe' && element_2.pseudo != USER_NAME && element_2.pseudo != response.PSEUDO_RECEPTEUR) {

                    nbr++

                    let row_1 = `
                                <tr id="rowadd_${element_2.id}">
                                <th scope="row">${nbr}</th>
                                <td>${element_2.pseudo}</td>
                                <td> <button class="btn btn-primary" 
                                onclick=ajouter_au_groupe(${element_2.id})> Ajouter  </button> </td>
                            </tr>`

                    document.getElementById('user_invitation_3').innerHTML += row_1






                }
            });


            $('#reajouter_user_au_groupe').modal({
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




})





function ajouter_au_groupe(params) {

    NOM_DU_GROUPE[0] = PSEUDO_RECEPTEUR[0]
    ID_DISCUSSIONS_GROUPE[0] = ID_DISCUSSIONS[0]

    envoye_invitation(params)

    document.getElementById('rowadd_' + params).style.display = "none"

}








document.getElementById('btn_delete_user_in_group').addEventListener('click', function (params) {

    $('#menu_groupes').modal("hide")

    let les_donnees = new FormData()

    les_donnees.append('nom_group', PSEUDO_RECEPTEUR[0])


    fetch(URL + '/les_membre_du_groupe', {
        method: 'POST',
        body: les_donnees,
        headers: {
            Accept: "application/json",

        }
    }).then(response => response.json())
        .then(response => {


            console.log('####################')
            console.log(response)

            document.getElementById('user_delete_3').innerHTML = ''


            let nbr = 0
            response.les_membres.forEach(element_2 => {

                nbr++

                let row_1 = `
                                <tr id="rowdelete_${element_2.id}">
                                <th scope="row">${nbr}</th>
                                <td>${element_2.emetteur}</td>
                                <td> <button class="btn btn-primary" 
                                onclick=delete_from_group(${element_2.id})> supprimer du groupe  </button> </td>
                            </tr>`

                document.getElementById('user_delete_3').innerHTML += row_1


            });


            $('#supprimer_user_au_groupe').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            })





        })
        .catch((error) => {
            // console.log(error)
            // loader(false)
            // error_internet()
        });




})





function delete_from_group(params) {
    console.log(params)

    let les_donnees = new FormData();

    les_donnees.append("id", params);

    fetch(URL + "/delete_from_group", {
        method: "POST",
        body: les_donnees,
    })
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if (response.resultat == "save") {

                document.getElementById('rowdelete_' + params).style.display = "none"

                swal({
                    title: "succès",
                    text: "Utilisateur supprimé du groupe",
                    icon: "success",

                });
            }

            else {
                swal({
                    title: "erreur",
                    text: "l'utilisateru n'est plus dans le goupe ",
                    icon: "warning",

                });
            }

        })
        .catch((error) => {
            console.log(error)
        });

}




document.getElementById('btn_update_info_group').addEventListener('click', function (params) {

    $('#menu_groupes').modal("hide")



    let les_donnees = new FormData();

    les_donnees.append("nom_groupe", PSEUDO_RECEPTEUR[0]);

    fetch(URL + "/info_groupe", {
        method: "POST",
        body: les_donnees,
    })
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            response.resultat.forEach(element => {
                if (element.profile == "") {
                    document.getElementById('image-preview_g_m').src = 'https://via.placeholder.com/400';
                }
                else {
                    document.getElementById('image-preview_g_m').src = URL_FILE + '/' + element.profile;
                }
                document.getElementById('nom_group_m').value = element.pseudo
            });

            $('#update_group').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            })



        })
        .catch((error) => {
            console.log(error)
        });



})




document.getElementById('btn_update_info_groupe').addEventListener('click', function (params) {


    let image = document.getElementById('imageg_m').value.trim();

    let nom_group = document.getElementById('nom_group_m').value.trim()

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

        if (nom_group == PSEUDO_RECEPTEUR[0]) {

            if (image != "") {

                let le_fichier = document.getElementById('imageg_m').files[0]

                les_donnees.append('image', le_fichier)
                les_donnees.append('pseudo', nom_group)
                les_donnees.append('initail_pseudo', PSEUDO_RECEPTEUR[0])

                les_donnees.append('action', 'modifier_image')

                fetch(URL + '/update_info_groupe', {
                    method: 'POST',
                    body: les_donnees,
                    headers: {
                        Accept: "application/json",

                    }
                }).then(response => response.json())
                    .then(response => {

                        if (response.resultat == "save") {

                            BASE_USER = []
                            PSEUDO_RECEPTEUR[0] = nom_group
                            document.getElementById('imageg_m').value = ''

                            swal({
                                title: "succès",
                                text: "Information modifié avec succès",
                                icon: "success",

                            });
                        }

                        if (response.resultat == "user_found") {

                            swal({
                                title: "Erreur",
                                text: "Le groupe existe déjà",
                                icon: "error",

                            });
                        }


                    })
                    .catch((error) => {
                        error_internet()
                    });


            }
        }

        // ###############################################
        if (nom_group != PSEUDO_RECEPTEUR[0]) {

            if (image != "") {
                let le_fichier = document.getElementById('imageg_m').files[0]

                les_donnees.append('image', le_fichier)
                les_donnees.append('pseudo', nom_group)
                les_donnees.append('initail_pseudo', PSEUDO_RECEPTEUR[0])
                les_donnees.append('action', 'modifier_image_et_nom')

                fetch(URL + '/update_info_groupe', {
                    method: 'POST',
                    body: les_donnees,
                    headers: {
                        Accept: "application/json",

                    }
                }).then(response => response.json())
                    .then(response => {

                        if (response.resultat == "save") {

                            BASE_USER = []
                            PSEUDO_RECEPTEUR[0] = nom_group
                            document.getElementById('imageg_m').value = ''

                            swal({
                                title: "succès",
                                text: "Information modifié avec succès",
                                icon: "success",

                            });
                        }

                        if (response.resultat == "user_found") {

                            swal({
                                title: "Erreur",
                                text: "Le groupe existe déjà",
                                icon: "error",

                            });
                        }


                    })
                    .catch((error) => {
                        error_internet()
                    });
            }
            // ###############################################
            else {

                console.log('modifier nom groupe')
                console.log(image)

                les_donnees.append('pseudo', nom_group)
                les_donnees.append('initail_pseudo', PSEUDO_RECEPTEUR[0])

                les_donnees.append('action', 'modifier_nom')

                fetch(URL + '/update_info_groupe', {
                    method: 'POST',
                    body: les_donnees,
                    headers: {
                        Accept: "application/json",

                    }
                }).then(response => response.json())
                    .then(response => {

                        console.log(response)

                        if (response.resultat == "save") {

                            BASE_USER = []
                            PSEUDO_RECEPTEUR[0] = nom_group
                            document.getElementById('imageg_m').value = ''

                            swal({
                                title: "succès",
                                text: "Information modifié avec succès",
                                icon: "success",

                            });
                        }

                        if (response.resultat == "user_found") {

                            swal({
                                title: "Erreur",
                                text: "Le groupe existe déjà",
                                icon: "error",

                            });
                        }

                    })
                    .catch((error) => {
                        error_internet()
                    });
            }
        }













        // ###############################################








    }
})




document.getElementById('btn_delete_groupe').addEventListener('click', function (params) {




    swal({
        title: "Suppression",
        text: "Voulez vous supprimez le groupe ? ",
        icon: "warning",
        buttons: ["Annuler", "Oui"],
        confirmButtonColor: '#2C3648',
        closeOnClickOutside: false,
        // dangerMode: true,

    })
        .then((willDelete) => {
            if (willDelete) {


                let les_donnees = new FormData()


                les_donnees.append('initail_pseudo', PSEUDO_RECEPTEUR[0])

                fetch(URL + '/delete_groupe', {
                    method: 'POST',
                    body: les_donnees,
                    headers: {
                        Accept: "application/json",

                    }
                }).then(response => response.json())
                    .then(response => {

                        if (response.resultat == "save") {


                            BASE_USER = []
                            PSEUDO_RECEPTEUR[0] = ''
                            document.getElementById('contenneur_messages').innerHTML = ''
                            document.getElementById('total_membre').style.display = 'none'
                            document.getElementById('menu_goupe').style.display = 'none'


                            swal({
                                title: "succès",
                                text: "Groupe supprimé avec succès",
                                icon: "success",

                            });
                        }




                    })
                    .catch((error) => {
                        error_internet()
                    });



            }
        });

})






document.getElementById('btn_update_info_personnel').addEventListener('click', function (params) {


    let les_donnees = new FormData();

    console.log(USER_NAME)



    les_donnees.append("pseudo", USER_NAME);

    fetch(URL + '/mes_infos',
        {
            method: 'post',
            body: les_donnees,
            headers: {
                Accept: "application/json",
            }
        }
    ).then(response => response.json())
        .then(response => {

            response.resultat.forEach(element => {
                if (element.profile == "") {
                    document.getElementById('image-preview_p_m').src = 'https://via.placeholder.com/400';
                }
                else {
                    document.getElementById('image-preview_p_m').src = URL_FILE + '/' + element.profile;
                }
                document.getElementById('nom_pseudo_m').value = element.pseudo
            });

            $('#update_info_personnel').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            })

        })
        .catch((error) => {

            console.log(error);
        });


})








document.getElementById('btn_update_info_persoel').addEventListener('click', function (params) {


    let image = document.getElementById('imagep_m').value.trim();

    let nom_group = document.getElementById('nom_pseudo_m').value.trim()

    if (nom_group == "") {
        swal({
            title: "erreur",
            text: "Le nom d'utisateur est  obligatoire",
            icon: "error",
            button: "D'accord",
            closeOnClickOutside: false,
            dangerMode: true,
        });
    } else {


        let les_donnees = new FormData()

        if (nom_group == USER_NAME) {

            if (image != "") {

                let le_fichier = document.getElementById('imagep_m').files[0]

                les_donnees.append('image', le_fichier)
                les_donnees.append('pseudo', nom_group)
                les_donnees.append('initail_pseudo', USER_NAME)

                les_donnees.append('action', 'modifier_image')

                fetch(URL + '/update_info_PERSO', {
                    method: 'POST',
                    body: les_donnees,
                    headers: {
                        Accept: "application/json",

                    }
                }).then(response => response.json())
                    .then(response => {

                        if (response.resultat == "save") {

                            information_personnel();

                            swal({
                                title: "succès",
                                text: "Information modifié avec succès",
                                icon: "success",

                            });
                        }

                        if (response.resultat == "user_found") {

                            swal({
                                title: "Erreur",
                                text: "Le groupe existe déjà",
                                icon: "error",

                            });
                        }


                    })
                    .catch((error) => {
                        error_internet()
                    });


            }
        }

        // ###############################################
        if (nom_group != USER_NAME) {

            if (image != "") {
                let le_fichier = document.getElementById('imagep_m').files[0]

                les_donnees.append('image', le_fichier)
                les_donnees.append('pseudo', nom_group)
                les_donnees.append('initail_pseudo', USER_NAME)
                les_donnees.append('action', 'modifier_image_et_nom')

                fetch(URL + '/update_info_PERSO', {
                    method: 'POST',
                    body: les_donnees,
                    headers: {
                        Accept: "application/json",

                    }
                }).then(response => response.json())
                    .then(response => {

                        if (response.resultat == "save") {



                            window.localStorage.setItem('id_chat_user_bewell', nom_group)

                            window.location.reload()

                            swal({
                                title: "succès",
                                text: "Information modifié avec succès",
                                icon: "success",

                            });
                        }

                        if (response.resultat == "user_found") {

                            swal({
                                title: "Erreur",
                                text: "Le nom existe déjà",
                                icon: "error",

                            });
                        }


                    })
                    .catch((error) => {
                        error_internet()
                    });
            }
            // ###############################################
            else {

                console.log('modifier nom groupe')
                console.log(image)

                les_donnees.append('pseudo', nom_group)
                les_donnees.append('initail_pseudo', USER_NAME)

                les_donnees.append('action', 'modifier_nom')

                fetch(URL + '/update_info_PERSO', {
                    method: 'POST',
                    body: les_donnees,
                    headers: {
                        Accept: "application/json",

                    }
                }).then(response => response.json())
                    .then(response => {

                        console.log(response)

                        if (response.resultat == "save") {

                            window.localStorage.setItem('id_chat_user_bewell', nom_group)

                            window.location.reload()

                            swal({
                                title: "succès",
                                text: "Information modifié avec succès",
                                icon: "success",

                            });
                        }

                        if (response.resultat == "user_found") {

                            swal({
                                title: "Erreur",
                                text: "Le nom existe déjà",
                                icon: "error",

                            });
                        }

                    })
                    .catch((error) => {
                        error_internet()
                    });
            }
        }













        // ###############################################








    }
})





function information_personnel_bis(params) {



    let les_donnees = new FormData();

    les_donnees.append("pseudo", params);

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
                    src_img += `<img id="image-preview" src="https://via.placeholder.com/400"
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
















var image_choose = document.getElementById("ajouter_image");
image_choose.addEventListener("change", function () {
    const file = this.files;
    // console.log(file[0]);
    console.log(file.length);

    if (file.length > 0) {
        if (file.length > 20) {
            swal({
                title: "Image",
                text: "Vous avez la possibilité de choisir 3 images!",
                icon: "warning",
                button: "Ok",
                closeOnClickOutside: false,
                dangerMode: true,
            });
        } else {
            document.getElementById('content_image_send').innerHTML = ""
            document.getElementById('content_image_send').style.display = "block"
            for (let i = 0; i < file.length; i++) {
                const reader = new FileReader();
                reader.addEventListener("load", function () {

                    let nom_image = file[i].name;
                    let extenssion_image = nom_image.split('.').pop().toLowerCase();

                    console.log(nom_image)

                    if (extenssion_image == 'png' || extenssion_image == 'jpeg'
                        || extenssion_image == 'jpg' || extenssion_image == 'gif') {

                        document.getElementById('content_image_send').innerHTML += ` 
                        <img src="${this.result}" alt="" style="margin-bottom:5px;width: 175px; height: 120px;">`

                    }
                    if (extenssion_image == 'docx' || extenssion_image == 'doc') {

                        document.getElementById('content_image_send').innerHTML += ` 
                        <img src="./fichier/word.jpg" alt="" style="margin-bottom:5px;width: 175px; height: 120px;">
                         `

                    }


                    if (extenssion_image == 'pdf') {

                        document.getElementById('content_image_send').innerHTML += ` 
                         <img src="./fichier/pdf.png" alt="" style="margin-bottom:5px;width: 175px; height: 120px;">
                          `
                    }


                    document.getElementById('chat_zone').scrollTop = document.getElementById('chat_zone').scrollHeight

                    // document
                    //     .getElementById("image_" + [i])
                    //     .setAttribute("src", this.result);
                    // document
                    //     .getElementById("image_" + [i]).style.display = "block";

                });
                reader.readAsDataURL(file[i]);
            }
        }
    }
});





document.getElementById('blue').addEventListener('click', function (params) {
    document.getElementById('blue').className = ''
    document.getElementById('blue').className = 'color blue selected'

    window.localStorage.setItem('color_chat_user_bewell', 'blue')

})

document.getElementById('purple').addEventListener('click', function (params) {
    document.getElementById('purple').className = ''
    document.getElementById('purple').className = 'color purple selected'

    window.localStorage.setItem('color_chat_user_bewell', 'purple')
})

document.getElementById('green').addEventListener('click', function (params) {
    document.getElementById('green').className = ''
    document.getElementById('green').className = 'color green selected'

    window.localStorage.setItem('color_chat_user_bewell', 'green')
})

document.getElementById('orange').addEventListener('click', function (params) {
    document.getElementById('orange').className = ''
    document.getElementById('orange').className = 'color orange selected'

    window.localStorage.setItem('color_chat_user_bewell', 'orange')
})