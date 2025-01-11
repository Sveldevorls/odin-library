const newBookDialog = document.body.querySelector("dialog")
const newBookDialogAdd = document.body.querySelector("#newbook-add")
const newBookDialogCancel = document.body.querySelector("#newbook-cancel")

newBookDialogAdd.addEventListener("click", () => {
    newBookDialog.showModal();
})

newBookDialogCancel.addEventListener("click", () => {
    newBookDialog.close();
})