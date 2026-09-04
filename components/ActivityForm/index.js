export default function AcitityForm() {
  function handleOnSubmit(event) {
    event.PreventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    return (
      <form>
        <label>fsdsfsd</label>
        <input />
      </form>
    );
  }
}
