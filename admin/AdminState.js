export const AdminState = {
  editMode: false,
  currentEditId: null,

  setEditMode(id) {
    this.editMode = true;
    this.currentEditId = id;
  },

  reset() {
    this.editMode = false;
    this.currentEditId = null;
  }
};
