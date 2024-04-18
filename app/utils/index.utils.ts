export const BootstrapMethods = {
    getBootstarp() {
        if (typeof window === 'undefined') {
            console.warn('window is undefined');
            return null;
        }

        return require('bootstrap')
    },
    toggle(id: string) {
        const boostrap = this.getBootstarp();
        const modal = new boostrap.Modal(`#${id}`);
        modal.toggle()
    },

    hide(id: string) {
        const boostrap = this.getBootstarp();
        const modal = new boostrap.Modal(`#${id}`);
        modal.hide()
    }
}
