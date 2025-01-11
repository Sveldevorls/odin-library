const newBookDialog = document.body.querySelector("dialog")
const newBookDialogAdd = document.body.querySelector("#newbook-add")
const newBookDialogClose = document.body.querySelector("#newbook-close")

newBookDialogAdd.addEventListener("click", () => {
    newBookDialog.showModal();
})

newBookDialogClose.addEventListener("click", () => {
    newBookDialog.close();
})