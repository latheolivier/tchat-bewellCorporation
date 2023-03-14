$(document).ready(function () {

    // alert('rrfrf')



    // getColor()
    // getTheme()
});



var ID_DISCUSSIONS = Array()  //  ID DE DISCUSSION
var TYPE_DISCUSSION = Array()  //  TYPE DE DISCUSSION
// var ID_DISCUSSIONS = Array()  //  ID DE DISCUSSION
var PSEUDO_RECEPTEUR = Array()  //  PSEUDO E DU RECEPTEUR
var BASE_DISCUSSION = Array()  //  base de donnne de discussion
var ID_TAG = ''  //  base de donnne de discussion

var LES_IMAGES_DROP = Array()









document.getElementById('btn_darck').addEventListener('click', function (params) {

    let mon_theme = window.localStorage.getItem('theme_chat_user_bewell')

    console.log('mon_theme')
    console.log(mon_theme)

    if (mon_theme == 1) {
        document.body.classList.toggle('dark-mode');
        window.localStorage.setItem('theme_chat_user_bewell', 0)
    }
    else if (mon_theme == 0) {
        document.body.classList.toggle('dark-mode');
        window.localStorage.setItem('theme_chat_user_bewell', 1)
    }
    else {
        document.body.classList.toggle('dark-mode');
        window.localStorage.setItem('theme_chat_user_bewell', 0)
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
    // if (typeof la_couleur != null) {


    //     document.getElementById('' + la_couleur + '').className = ''
    //     document.getElementById('' + la_couleur + '').className = 'color ' + la_couleur + ' selected'

    //     document.body.setAttribute('data-theme', la_couleur);

    // }
}





function check_message(params) {

    document.getElementById('content_image_send').innerHTML = ""
    document.getElementById('ajouter_image').value = ""
    document.getElementById('content_image_send').style.display = "none"


    BASE_DISCUSSION = []


    document.getElementById('contenneur_messages').innerHTML = ' '
    document.getElementById('contenneur_messages').innerHTML = `
    <div class="d-flex justify-content-center"  >
    <div class="spinner-border text-warning" role="status" id="my_spinnerss">    </div>
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




































// $(document).on('keypress', function (e) {
//     if (e.which == 13) {
//         // alert('You pressed enter!');
//         send_msg()
//     }
// });






document.getElementById('btn_send_message').addEventListener('click', function (params) {
    send_msg()
})


function send_msg() {

    // let message = $('#message_text').val().trim()
    let message = $('#message_text').val().trim()

    console.log(message)



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

        if (message == '' && LES_IMAGES_DROP.length == 0) {
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



                // let total = document.getElementById('ajouter_image').files.length
                // if (total > 0) {
                //     for (let b = 0; b < total; b++) {
                //         les_donnees.append('fichier[]', document.getElementById('ajouter_image').files[b])
                //     }


                // } else {
                //     les_donnees.append('fichier[]', '')
                // }


                let total = LES_IMAGES_DROP.length
                if (total > 0) {
                    for (let b = 0; b < total; b++) {
                        les_donnees.append('fichier[]', LES_IMAGES_DROP[b])
                    }


                } else {
                    les_donnees.append('fichier[]', '')
                }





                les_donnees.append("id_discussion", ID_DISCUSSIONS[0]);
                les_donnees.append("emetteur_msg", USER_NAME);
                les_donnees.append("recepteur_msg", PSEUDO_RECEPTEUR[0]);
                // les_donnees.append("message", message.replace(/ {2,}/g, '<br> '));
                les_donnees.append("message", message.split("\n").join("<br />"));
                les_donnees.append("id_tag", ID_TAG);

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
                            // let elemen = $("#message_text").emojioneArea()
                            // elemen[0].emojioneArea.setText('')
                            ID_TAG = ''
                            LES_IMAGES_DROP = []
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

                // let total = document.getElementById('ajouter_image').files.length
                // for (let b = 0; b < total; b++) {
                //     les_donnees.append('fichier[]', document.getElementById('ajouter_image').files[b])
                // }

                let total = LES_IMAGES_DROP.length
                if (total > 0) {
                    for (let b = 0; b < total; b++) {
                        les_donnees.append('fichier[]', LES_IMAGES_DROP[b])
                    }


                } else {
                    les_donnees.append('fichier[]', '')
                }

                les_donnees.append("nom_groupe", PSEUDO_RECEPTEUR[0]);
                les_donnees.append("id_discussion", ID_DISCUSSIONS[0]);
                les_donnees.append("emetteur", USER_NAME);
                les_donnees.append("message", message);
                les_donnees.append("id_tag", ID_TAG);

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
                            ID_TAG = ''
                            LES_IMAGES_DROP = []
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












function reply_click(id) {
    document.querySelector(`#${id}`).scrollIntoView();
}







function recuperer_messages() {

    // var position = document.getElementById('contenneur_messages').scrollTop;

    // console.log('la position')
    // console.log(position)

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
                            let recherche_2 = BASE_DISCUSSION.filter(o1 => !response.resultat.some(o2 => o1.id === o2.id));

                            if (recherche.length > 0 || recherche_2.length > 0) {
                                BASE_DISCUSSION = []
                                response.resultat.forEach(element_reche => {
                                    BASE_DISCUSSION.push(element_reche)
                                });


                                document.getElementById('contenneur_messages').innerHTML = ''

                                response.resultat.forEach(element => {


                                    BASE_DISCUSSION.push(element)

                                    let les_images = ''

                                    for (let compt = 0; compt < 20; compt++) {
                                        console.log(element['image_msg_' + compt])

                                        if (element['image_msg_' + compt] != '') {

                                            let extenssion_image = element['image_msg_' + compt].split('.').pop();

                                            if (extenssion_image == 'png' || extenssion_image == 'jpeg'
                                                || extenssion_image == 'jpg' || extenssion_image == 'gif') {
                                                les_images += `
                                                <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">
                                                <img
                                                src="${URL_FILE + '/' + element['image_msg_' + compt]}" />
                                                </div>
                                                `
                                            }
                                            if (extenssion_image == 'docx' || extenssion_image == 'doc') {

                                                les_images += `
                                            <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">
    
                                                <div style="width:90%" class="d-flex justify-content-between" >
    
                                                    <div >
    
                                                        <img   src="./fichier/word.jpg" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />
    
                                                    </div>
                                                    <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>
    
    
                                                </div>
    
    
                                             </div>
                                            `

                                            }


                                            if (extenssion_image == 'pdf') {

                                                les_images += `
                                            <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">
    
                                                <div style="width:90%" class="d-flex justify-content-between" >
    
                                                    <div >
    
                                                        <img   src="./fichier/pdf.png" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />
    
                                                    </div>
                                                    <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>
    
    
                                                </div>
    
    
                                             </div>
                                            `
                                            }

                                            if (extenssion_image == 'xls') {

                                                les_images += `
                                            <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">
    
                                                <div style="width:90%" class="d-flex justify-content-between" >
    
                                                    <div >
    
                                                        <img   src="./fichier/excel.jpeg" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />
    
                                                    </div>
                                                    <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>
    
    
                                                </div>
    
    
                                             </div>
                                            `
                                            }


                                            if (extenssion_image == 'zip' || extenssion_image == 'rar') {

                                                les_images += `
                                            <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">
    
                                                <div style="width:90%" class="d-flex justify-content-between" >
    
                                                    <div >
    
                                                        <img   src="./fichier/winrar.png" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />
    
                                                    </div>
                                                    <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>
    
    
                                                </div>
    
    
                                             </div>
                                            `
                                            }


                                        }

                                    }

                                    let row = ''

                                    if (element.emetteur_msg == USER_NAME) {
                                        row += `
                                        <div class="chat-msg owner   me">

                                            <div class="chat-msg-content">
                                            `+ design_tag(response.resultat, element.id_tag) + ` 
                                            ${les_images}

                                            ${element.message == "" ? "" :
                                                `<div class="chat-msg-text menu_message" data-type-menu="${element.id}">                             
                                                    ${element.message} 
                                                    </div>`   }

                                                    <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>
                                            </div>
                                        </div>
                                `
                                    }
                                    else {

                                        response.all_user.forEach(les_users => {
                                            if (les_users.pseudo == element.emetteur_msg) {
                                                row += `
                                            <div class="chat-msg  you">
                                            <div class="chat-msg-profile">
                                              <img class="chat-msg-img"
                                                src="${URL_FILE + '/' + les_users.profile}" alt="" />
                                              <div class="chat-msg-date">${les_users.pseudo}</div>
                                             
                                            </div>
                                            <div class="chat-msg-content">
                                            `+ design_tag(response.resultat, element.id_tag) + ` 
                                            ${les_images}
                                               
                                              ${element.message == "" ? "" :
                                                        `<div class="chat-msg-text menu_message" data-type-menu="${element.id}">                             
                                                ${element.message} 
                                                </div>`   }

                                                <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>
                                            </div>
                                            
                                          </div>
                                        `
                                            }
                                        });


                                    }



                                    document.getElementById('contenneur_messages').innerHTML += row







                                });

                                document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight


                                setTimeout(() => {
                                    document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight + 100

                                }, 500);


                            }






                        }
                        else {



                            document.getElementById('contenneur_messages').innerHTML = ''


                            response.resultat.forEach(element => {


                                BASE_DISCUSSION.push(element)

                                let les_images = ''


                                for (let compt = 0; compt < 20; compt++) {
                                    console.log(element['image_msg_' + compt])

                                    if (element['image_msg_' + compt] != '') {

                                        let extenssion_image = element['image_msg_' + compt].split('.').pop();

                                        if (extenssion_image == 'png' || extenssion_image == 'jpeg'
                                            || extenssion_image == 'jpg' || extenssion_image == 'gif') {
                                            les_images += `
                                            <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">
                                            <img
                                            src="${URL_FILE + '/' + element['image_msg_' + compt]}" />
                                            </div>
                                            `
                                        }
                                        if (extenssion_image == 'docx' || extenssion_image == 'doc') {

                                            les_images += `
                                        <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">

                                            <div style="width:90%" class="d-flex justify-content-between" >

                                                <div >

                                                    <img   src="./fichier/word.jpg" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />

                                                </div>
                                                <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>


                                            </div>


                                         </div>
                                        `

                                        }


                                        if (extenssion_image == 'pdf') {

                                            les_images += `
                                        <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">

                                            <div style="width:90%" class="d-flex justify-content-between" >

                                                <div >

                                                    <img   src="./fichier/pdf.png" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />

                                                </div>
                                                <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>


                                            </div>


                                         </div>
                                        `
                                        }

                                        if (extenssion_image == 'xls') {

                                            les_images += `
                                        <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">

                                            <div style="width:90%" class="d-flex justify-content-between" >

                                                <div >

                                                    <img   src="./fichier/excel.jpeg" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />

                                                </div>
                                                <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>


                                            </div>


                                         </div>
                                        `
                                        }

                                        if (extenssion_image == 'zip' || extenssion_image == 'rar') {

                                            les_images += `
                                        <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">

                                            <div style="width:90%" class="d-flex justify-content-between" >

                                                <div >

                                                    <img   src="./fichier/winrar.png" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />

                                                </div>
                                                <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>


                                            </div>


                                         </div>
                                        `
                                        }


                                    }

                                }



                                let row = ''

                                if (element.emetteur_msg == USER_NAME) {
                                    row += `
                                        <div class="chat-msg owner   me">

                                        <div class="chat-msg-content">

                                        `+ design_tag(response.resultat, element.id_tag) + ` 

                                        ${les_images}

                                        ${element.message == "" ? "" :
                                            `<div class="chat-msg-text menu_message" data-type-menu="${element.id}">                             
                                        ${element.message} 
                                        </div>`   }
                                        <span   style="font-size:12px !important"> ${element.dates}</span>
                                       
                                        </div>
                                    </div>
                                        `
                                }
                                else {
                                    response.all_user.forEach(les_users => {
                                        if (les_users.pseudo == element.emetteur_msg) {
                                            row += `
                                            <div class="chat-msg  you">
                                            <div class="chat-msg-profile">
                                              <img class="chat-msg-img"
                                                src="${URL_FILE + '/' + les_users.profile}" alt="" />
                                              <div class="chat-msg-date">${les_users.pseudo}</div>
                                             
                                            </div>
                                            <div class="chat-msg-content">

                                            `+ design_tag(response.resultat, element.id_tag) + ` 
                                           
                                            ${les_images}
                                               
                                              ${element.message == "" ? "" :
                                                    `<div class="chat-msg-text menu_message" data-type-menu="${element.id}">                             
                                                ${element.message} 
                                                </div>`   }

                                                <span   style="font-size:12px !important"> ${element.dates}</span>
                                            </div>
                                            
                                          </div>
                                        `
                                        }

                                    });

                                }


                                document.getElementById('contenneur_messages').innerHTML += row

                            });

                            document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight

                            setTimeout(() => {
                                document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight + 100

                            }, 500);


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
                            let recherche_2 = BASE_DISCUSSION.filter(o1 => !response.resultat.some(o2 => o1.id === o2.id));

                            if (recherche.length > 0 || recherche_2.length > 0) {
                                BASE_DISCUSSION = []
                                response.resultat.forEach(element_reche => {
                                    BASE_DISCUSSION.push(element_reche)
                                });


                                document.getElementById('contenneur_messages').innerHTML = ''

                                response.resultat.forEach(element => {

                                    BASE_DISCUSSION.push(element)


                                    let les_images = ''

                                    for (let compt = 0; compt < 20; compt++) {
                                        console.log(element['image_msg_' + compt])

                                        if (element['image_msg_' + compt] != '') {

                                            let extenssion_image = element['image_msg_' + compt].split('.').pop();

                                            if (extenssion_image == 'png' || extenssion_image == 'jpeg'
                                                || extenssion_image == 'jpg' || extenssion_image == 'gif') {
                                                les_images += `
                                                <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">
                                                <img
                                                src="${URL_FILE + '/' + element['image_msg_' + compt]}" />
                                                </div>
                                                `
                                            }
                                            if (extenssion_image == 'docx' || extenssion_image == 'doc') {

                                                les_images += `
                                            <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">
    
                                                <div style="width:90%" class="d-flex justify-content-between" >
    
                                                    <div >
    
                                                        <img   src="./fichier/word.jpg" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />
    
                                                    </div>
                                                    <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>
    
    
                                                </div>
    
    
                                             </div>
                                            `

                                            }


                                            if (extenssion_image == 'pdf') {

                                                les_images += `
                                            <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">
    
                                                <div style="width:90%" class="d-flex justify-content-between" >
    
                                                    <div >
    
                                                        <img   src="./fichier/pdf.png" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />
    
                                                    </div>
                                                    <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>
    
    
                                                </div>
    
    
                                             </div>
                                            `
                                            }

                                            if (extenssion_image == 'xls') {

                                                les_images += `
                                            <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">
    
                                                <div style="width:90%" class="d-flex justify-content-between" >
    
                                                    <div >
    
                                                        <img   src="./fichier/excel.jpeg" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />
    
                                                    </div>
                                                    <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>
    
    
                                                </div>
    
    
                                             </div>
                                            `
                                            }

                                            if (extenssion_image == 'zip' || extenssion_image == 'rar') {

                                                les_images += `
                                            <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">
    
                                                <div style="width:90%" class="d-flex justify-content-between" >
    
                                                    <div >
    
                                                        <img   src="./fichier/winrar.png" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />
    
                                                    </div>
                                                    <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>
    
    
                                                </div>
    
    
                                             </div>
                                            `
                                            }


                                        }

                                    }


                                    let row = ''

                                    if (element.emetteur_msg == USER_NAME) {
                                        row += `
                                    <div class="chat-msg owner   me">

                                    <div class="chat-msg-content">
                                    `+ design_tag(response.resultat, element.id_tag) + `
                                    
                                    ${les_images}

                                    ${element.message == "" ? "" :
                                                `<div class="chat-msg-text menu_message" data-type-menu="${element.id}">                             
                                    ${element.message} 
                                    </div>`   }

                                    <span   style="font-size:12px !important"> ${element.dates}</span>
                                     </div>
                                  </div>
                                    `
                                    }
                                    else {
                                        row += `
                                    <div class="chat-msg  you">

                                    <div class="chat-msg-content">

                                    `+ design_tag(response.resultat, element.id_tag) + `

                                    ${les_images}

                                    ${element.message == "" ? "" :
                                                `<div class="chat-msg-text menu_message" data-type-menu="${element.id}">                             
                                    ${element.message} 
                                    </div>`   }

                                    <span   style="font-size:12px !important"> ${element.dates}</span>
                                    </div>
                                    </div>
                                    `
                                    }



                                    document.getElementById('contenneur_messages').innerHTML += row



                                    document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight + 100



                                });

                                document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight + 100


                                setTimeout(() => {
                                    document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight + 100

                                }, 500);


                            }





                        }
                        else {




                            document.getElementById('contenneur_messages').innerHTML

                            response.resultat.forEach((element, i) => {

                                BASE_DISCUSSION.push(element)


                                let les_images = ''

                                for (let compt = 0; compt < 20; compt++) {
                                    console.log(element['image_msg_' + compt])

                                    if (element['image_msg_' + compt] != '') {

                                        let extenssion_image = element['image_msg_' + compt].split('.').pop();

                                        if (extenssion_image == 'png' || extenssion_image == 'jpeg'
                                            || extenssion_image == 'jpg' || extenssion_image == 'gif') {
                                            les_images += `
                                            <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">
                                            <img
                                            src="${URL_FILE + '/' + element['image_msg_' + compt]}" />
                                            </div>
                                            `
                                        }
                                        if (extenssion_image == 'docx' || extenssion_image == 'doc') {

                                            les_images += `
                                        <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">

                                            <div style="width:90%" class="d-flex justify-content-between" >

                                                <div >

                                                    <img   src="./fichier/word.jpg" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />

                                                </div>
                                                <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>


                                            </div>


                                         </div>
                                        `

                                        }


                                        if (extenssion_image == 'pdf') {

                                            les_images += `
                                        <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">

                                            <div style="width:90%" class="d-flex justify-content-between" >

                                                <div >

                                                    <img   src="./fichier/pdf.png" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />

                                                </div>
                                                <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>


                                            </div>


                                         </div>
                                        `
                                        }
                                        if (extenssion_image == 'xls') {

                                            les_images += `
                                        <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">

                                            <div style="width:90%" class="d-flex justify-content-between" >

                                                <div >

                                                    <img   src="./fichier/excel.jpeg" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />

                                                </div>
                                                <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>


                                            </div>


                                         </div>
                                        `
                                        }

                                        if (extenssion_image == 'zip' || extenssion_image == 'rar') {

                                            les_images += `
                                        <div class="chat-msg-text menu_image" data-type-menu="${element.id}" data-name-image="${element['image_msg_' + compt]}">

                                            <div style="width:90%" class="d-flex justify-content-between" >

                                                <div >

                                                    <img   src="./fichier/winrar.png" alt="" style="margin-top:5px;margin-bottom:5px;width: 50px; height: 25px;" />

                                                </div>
                                                <p style="padding:5px;color:#fff;"> ${element['titre_img_' + compt]} </p>

                                            </div>


                                         </div>
                                        `
                                        }




                                    }

                                }





                                let ligne_message = ''


                                let row = ''

                                if (element.emetteur_msg == USER_NAME) {

                                    row += `
                                <div class="chat-msg owner   me">


                                    <div class="chat-msg-content">

                                     `+ design_tag(response.resultat, element.id_tag) + `  
                                      

                                    ${les_images}

                                    ${element.message == "" ? "" :
                                            `<div class="chat-msg-text menu_message" data-type-menu="${element.id}" >                             
                                    ${element.message} 
                                    </div>`   }
                                    
                                    <span   style="font-size:12px !important"> ${element.dates}</span>
                                    </div>

                                </div>   
                                `
                                }
                                else {
                                    row += `
                                    <div class="chat-msg  you " >
                                        
                                        <div class="chat-msg-content">

                                        `+ design_tag(response.resultat, element.id_tag) + ` 

                                        ${les_images}

                                        ${element.message == "" ? "" :
                                            `<div class="chat-msg-text menu_message" data-type-menu="${element.id}">                             
                                        ${element.message} 
                                        </div>`   }
                                        
                                        <span   style="font-size:12px !important"> ${element.dates}</span>
                                        </div>
                                    </div>
                                    `
                                }



                                document.getElementById('contenneur_messages').innerHTML += row



                                document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight + 100



                            });

                            document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight + 100

                            setTimeout(() => {
                                document.getElementById('contenneur_messages').scrollTop = document.getElementById('contenneur_messages').scrollHeight + 100

                            }, 500);


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
















function Cut_word(phraes, nbr) {
    if (phraes.length > nbr) {
        let cut = phraes.substring(0, nbr) + '...';
        return cut
    }
    else return phraes
}











function design_tag(data, params) {

    if (params != 0) {



        for (let n = 0; n < data.length; n++) {

            if (data[n].id == params) {
                let my_file = ""
                if (data[n].image_msg_0 != '') {
                    let extenssion_image = data[n].image_msg_0.split('.').pop();
                    if (extenssion_image == "jpg" || extenssion_image == "jpeg" || extenssion_image == "png") {
                        my_file += `<img src="${URL_FILE + '/' + data[n].image_msg_0}" alt="" style="margin-bottom:5px;width: 50px; height: 50px;">`
                    }
                    if (extenssion_image == "doc" || extenssion_image == "docx") {
                        my_file += `<img src="./fichier/word.jpg" alt="" style="margin-left:0px;margin-bottom:5px;width: 50px; height: 50px;">
                        `

                    }
                    if (extenssion_image == "pdf") {
                        my_file += `<img src="./fichier/pdf.png" alt="" style="margin-left:0px;margin-bottom:5px;width: 50px; height: 50px;">
                          `

                    }

                    if (extenssion_image == "xls") {
                        my_file += `<img src="./fichier/excel.jpeg" alt="" style="margin-left:0px;margin-bottom:5px;width: 50px; height: 50px;">
                          `

                    }
                }

                let innerHTMLs = `
                    <div  style="padding-bottom: 20px !important; margin-bottom: -20px !important; width:100%;background-color: #BADFD7;border-left: 5px solid teal;"  >


                    


                    <div  >
                    <p style="font-size:10px; text-transform: capitalize; padding:5px;color:black">${data[n].emetteur_msg == USER_NAME ? USER_NAME : data[n].emetteur_msg}  
                       
                    <div class="d-flex justify-content-endnd">

                            ${my_file}
                    </div>
                    
                    <p style="word-break:break-all;font-size:10px;color:black;"> ${Cut_word(data[n].message, 30)} </p>
                        </p>
                    </div>

                    
                  </div>
                    `

                return innerHTMLs
            }
        }
    } else {
        return ''
    }

    // <div style=" background-color: #BADFD7;color:black; border-radius: 20px 20px 20px 0;">
    // ${design_tag(element.id_tag)} 
    // </div>

}















(function ($) {
    'use strict';
    $.contextMenu({
        selector: '.menu_message',
        callback: function (key, options) {

            // let id = options.$trigger.attr("id");
            let my_class_name = options.$trigger.attr("data-type-menu");

            if (key == "taguer") {

                taguer_message(my_class_name)
            }
            if (key == "supprimer") {
                supprimer_message(my_class_name)
            }

        },
        items: {
            "taguer": {
                name: "Taguer le message",
            },
            "sep1": "---------",
            "supprimer": {
                name: "Supprimer le message",
                icon: "delete"
            },

        }
    });


    $.contextMenu({
        selector: '.menu_image',
        callback: function (key, options) {

            // let id = options.$trigger.attr("id");
            let my_class_name = options.$trigger.attr("data-type-menu");
            let name_image = options.$trigger.attr("data-name-image");

            if (key == "taguer") {

                taguer_message(my_class_name)
            }
            if (key == "telecharger") {
                downloadURI(name_image)
            }
            if (key == "supprimer") {
                supprimer_message(my_class_name)
            }

        },
        items: {
            "taguer": {
                name: "Taguer le message",
            },
            "telecharger": {
                name: "Télécharger le fichier",
            },
            "sep1": "---------",
            "supprimer": {
                name: "Supprimer le message",
                icon: "delete"
            },

        }
    });





})(jQuery);





function downloadURI(params) {

    console.log(params)

    // BASE_DISCUSSION.forEach(element => {
    //     if (element.id == params) {
    var link = document.createElement("a");
    // If you don't know the name or want to use
    // the webserver default set name = ''
    // link.setAttribute('download', element.image_msg_0);
    // link.href = URL_FILE + '/' + element.image_msg_0;
    link.setAttribute('download', params);
    link.href = URL_FILE + '/' + params;
    document.body.appendChild(link);
    link.click();
    link.remove();
    // return
    //     }

    // })
}





function taguer_message(params) {
    ID_TAG = params
    BASE_DISCUSSION.forEach(element => {
        if (element.id == params) {
            let my_file = ""
            if (element.image_msg_0 != '') {
                let extenssion_image = element.image_msg_0.split('.').pop();
                if (extenssion_image == "jpg" || extenssion_image == "jpeg" || extenssion_image == "png") {
                    my_file += `<img src="${URL_FILE + '/' + element.image_msg_0}" alt="" style="margin-left:-30px;margin-bottom:5px;width: 175px; height: 120px;">`
                }
                if (extenssion_image == "doc" || extenssion_image == "docx") {
                    my_file += `<img src="./fichier/word.jpg" alt="" style="margin-left:0px;margin-bottom:5px;width: 100px; height: 75px;">
                    <p style="font-size:10px;color:black;">  ${element.image_msg_0} </p>
                   `

                }
                if (extenssion_image == "pdf") {
                    my_file += `<img src="./fichier/pdf.png" alt="" style="margin-left:0px;margin-bottom:5px;width: 100px; height: 75px;">
                  <p style="font-size:10px;color:black;">  ${element.image_msg_0} </p>
                     `

                }
                if (extenssion_image == "xls") {
                    my_file += `<img src="./fichier/excel.jpeg" alt="" style="margin-left:0px;margin-bottom:5px;width: 100px; height: 75px;">
                  <p style="font-size:10px;color:black;">  ${element.image_msg_0} </p>
                     `

                }
                if (extenssion_image == "psd") {
                    my_file += `<img src="./fichier/winrar.png" alt="" style="margin-left:0px;margin-bottom:5px;width: 100px; height: 75px;">
                  <p style="font-size:10px;color:black;">  ${element.image_msg_0} </p>
                     `

                }
            }

            document.getElementById('content_image_send').innerHTML = ""

            document.getElementById('content_image_send').innerHTML = `
            <div style=" margin-top: 5px;" class="d-flex justify-content-end">
            <img src="./fichier/cancel_30px.png" alt="" style="margin-right: 20px;" onclick="btn_close()"></div>`

            document.getElementById('content_image_send').innerHTML += `
            <div style="border-left: 5px solid teal;" class="d-flex justify-content-between" >
          
            <div style="width:90%">
            <p style="text-transform: capitalize; padding:5px;color:black">${element.emetteur_msg == USER_NAME ? USER_NAME : element.emetteur_msg}
            <p style="padding:5px;color:black;"> ${element.message} </p>
            </p>
            </div>

             
            <div>
                ${my_file}
           </div>
          </div>
            `

            document.getElementById('content_image_send').style.display = "block"

        }
    });
}







function supprimer_message(params) {

    let recherche = []

    BASE_DISCUSSION.forEach(element => {
        if (element.id == params && element.emetteur_msg == USER_NAME) {
            recherche[0] = 'oui'
        }

    });

    if (recherche[0] == 'oui') {
        swal({
            title: "Suppression",
            text: "Voulez vous supprimez le message ? ",
            icon: "warning",
            buttons: ["Annuler", "Oui"],
            confirmButtonColor: '#2C3648',
            closeOnClickOutside: false,
            // dangerMode: true,

        })
            .then((willDelete) => {
                if (willDelete) {


                    let les_donnees = new FormData()


                    les_donnees.append('type', TYPE_DISCUSSION[0])
                    les_donnees.append('id', params)

                    fetch(URL + '/delete_message', {
                        method: 'POST',
                        body: les_donnees,
                        headers: {
                            Accept: "application/json",

                        }
                    }).then(response => response.json())
                        .then(response => {

                            if (response.resultat == "save") {


                                // BASE_DISCUSSION = []

                            }




                        })
                        .catch((error) => {
                            error_internet()
                        });



                }
            });
    }
    else {
        swal({
            title: "erreur",
            text: "Vous ne pouvez pas supprimer ce message",
            icon: "warning",

        });
    }



}















document.getElementById('menu_goupe').addEventListener('click', function (params) {

    let les_donnees = new FormData();

    les_donnees.append("pseudo", USER_NAME);

    fetch(URL + "/all_user", {
        method: "POST",
        body: les_donnees,
    })
        .then((response) => response.json())
        .then((response) => {
            // response.resultat.forEach(element => {

            if (response.resultat == 'admin') {
                $('#menu_groupes').modal({
                    show: true,
                    keyboard: false,
                    backdrop: 'static'
                })
            }

            // });

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

                // swal({
                //     title: "succès",
                //     text: "Utilisateur supprimé du groupe",
                //     icon: "success",

                // });
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
                            PSEUDO_RECEPTEUR = []
                            document.getElementById('titre_pseudo').innerHTML = ""
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












function btn_close() {
    ID_TAG = ''
    document.getElementById('content_image_send').innerHTML = ""
    document.getElementById('ajouter_image').value = ""
    document.getElementById('content_image_send').style.display = "none"

}

















function readfiles(files) {
    LES_IMAGES_DROP = []
    for (var i = 0; i < files.length; i++) {
        // console.log(files[i])
        // document.getElementById('ajouter_image').files = files[i]
        LES_IMAGES_DROP.push(files[i])



        // document.getElementById('fileDragSize').value = files[i].size
        // document.getElementById('fileDragType').value = files[i].type
        // reader = new FileReader();
        // reader.onload = function (event) {
        //     document.getElementById('ajouter_image').files = event.target.result;
        //     // $('#ajouter_image').attr('src', event.target.result);
        // }
        // reader.readAsDataURL(files[i]);
    }

    drag_images(files)

}



var holder = document.getElementById('chat_zone');


holder.ondragover = function () { this.className = 'contenneur_messages_drop_honer'; return false; };
holder.ondragend = function () { this.className = ''; return false; };
holder.ondrop = function (e) {
    this.className = 'contenneur_messages_drop_honer_end';
    e.preventDefault();
    readfiles(e.dataTransfer.files);
}






function drag_images(params) {
    const file = params;
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

            document.getElementById('content_image_send').innerHTML = `
            <div style=" margin-top: 5px;" class="d-flex justify-content-end">
            <img src="./fichier/cancel_30px.png" alt="" style="margin-right: 20px;" onclick="btn_close()"></div>

`
            document.getElementById('content_image_send').style.display = "block"



            for (let i = 0; i < file.length; i++) {
                const reader = new FileReader();
                reader.addEventListener("load", function () {

                    let nom_image = file[i].name;
                    let extenssion_image = nom_image.split('.').pop().toLowerCase();



                    if (jQuery.inArray(extenssion_image, ["jpg", "png", "jpeg", "gif", "pdf", "doc", "docx", "zip", "rar"]) == -1) {

                        // swal({
                        //     title: "Erreur image",
                        //     text: "Le format de l'image est incorrecte",
                        //     icon: "error",
                        //     button: "Ok",
                        // });


                    }
                    else {

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
                         `                 }

                        if (extenssion_image == 'xls') {

                            document.getElementById('content_image_send').innerHTML += ` 
                            <img src="./fichier/excel.jpeg" alt="" style="margin-bottom:5px;width: 175px; height: 120px;">
                             `                 }
                        if (extenssion_image == 'zip' || extenssion_image == 'rar') {

                            document.getElementById('content_image_send').innerHTML += ` 
                                    <img src="./fichier/winrar.png" alt="" style="margin-bottom:5px;width: 165px; height: 120px;">
                                     `                 }

                        document.getElementById('chat_zone').scrollTop = document.getElementById('chat_zone').scrollHeight

                    }
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
}








var image_choose = document.getElementById("ajouter_image");

image_choose.addEventListener("change", function () {
    LES_IMAGES_DROP = []

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

            document.getElementById('content_image_send').innerHTML = `
            <div style=" margin-top: 5px;" class="d-flex justify-content-end">
            <img src="./fichier/cancel_30px.png" alt="" style="margin-right: 20px;" onclick="btn_close()"></div>

`
            document.getElementById('content_image_send').style.display = "block"
            for (let i = 0; i < file.length; i++) {

                LES_IMAGES_DROP.push(file[i])

                const reader = new FileReader();
                reader.addEventListener("load", function () {

                    let nom_image = file[i].name;
                    let extenssion_image = nom_image.split('.').pop().toLowerCase();

                    if (jQuery.inArray(extenssion_image, ["jpg", "png", "jpeg", "gif", "pdf", "doc", "docx", "zip", "rar"]) == -1) {

                        // swal({
                        //     title: "Erreur image",
                        //     text: "Le format de l'image est incorrecte",
                        //     icon: "error",
                        //     button: "Ok",
                        // });


                    }
                    else {

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
                         `                 }

                        if (extenssion_image == 'xls') {

                            document.getElementById('content_image_send').innerHTML += ` 
                            <img src="./fichier/excel.jpeg" alt="" style="margin-bottom:5px;width: 175px; height: 120px;">
                             `                 }
                        if (extenssion_image == 'zip' || extenssion_image == 'rar') {

                            document.getElementById('content_image_send').innerHTML += ` 
                                            <img src="./fichier/winrar.png" alt="" style="margin-bottom:5px;width: 165px; height: 120px;">
                                             `                 }

                        document.getElementById('chat_zone').scrollTop = document.getElementById('chat_zone').scrollHeight

                    }
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





function translate(params) {
    if (params == 'user') {
        return 'Utilisateur'
    }

    if (params == 'admin') {
        return 'Administrateur'
    }
}


document.querySelector('.settings').addEventListener('click', function name(params) {


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

                if (element.role == 'admin') {

                    document.getElementById('attribution_role').innerHTML = ""


                    let nbr = 0
                    response.all_users.forEach(element_2 => {
                        if (element_2.type != "groupe" && element_2.pseudo != USER_NAME) {


                            nbr++

                            let row_1 = `
                                <tr>
                                <th scope="row">${nbr}</th>
                                <td>${element_2.pseudo}</td>
                                <td> 
                                 
                                <center>
                                <select class="form-control" onchange="getComboA(this,${element_2.id})">>
                                    <option value="${element_2.role} ">${translate(element_2.role)}</option>
                                    <option value="user">Utilisateur</option>
                                    <option value="admin">Administrateur</option>
                                 </select>
                              </center>
                              
                                 </td>
                            </tr>`

                            document.getElementById('attribution_role').innerHTML += row_1

                        }
                    });


                    $('#my_seting').modal({
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


function getComboA(selectObject, id) {
    var value = selectObject.value;

    if (id != '' && value != "") {


        let les_donnees = new FormData()

        les_donnees.append('id', id)
        les_donnees.append('role', value)

        fetch(URL + '/update_role_user', {
            method: 'POST',
            body: les_donnees,
            headers: {
                Accept: "application/json",

            }
        }).then(response => response.json())
            .then(response => {

                if (response.resultat == "save") {

                }




            })
            .catch((error) => {
                error_internet()
            });



    }
}