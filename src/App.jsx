import { useState } from "react";
import axios from "axios";
const endpointUrl = 'https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts'

function App() {
  const standardForm = {
    author: '',
    title: '',
    body: '',
    public: false
  }
  const [formData, setFormData] = useState(standardForm)
  const [message, setMessage] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()

    axios.post(endpointUrl, formData, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        console.log(response);
        if (response.status === 201) {
          setMessage('Post pubblicato! 😎')
        }
        setFormData(standardForm)
      })
      .catch(error => {
        console.log(error.message);
        setMessage(error.message)
      })
  }

  return (
    <div className="container p-4">
      <h2 className="text-center text-primary mb-4">Crea un nuovo post</h2>
      {message && <p className="text-center">{message}</p>}
      <form className="bg-light p-4 rounded shadow" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="author" className="form-label fw-bold">
            Autore
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="form-control"
            placeholder="Inserisci il nome dell’autore"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">
            Titolo
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="form-control"
            placeholder="Titolo del post"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label fw-bold">
            Testo del post
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            className="form-control"
            rows="5"
            placeholder="Scrivi qui il contenuto del post..."
          ></textarea>
        </div>
        <div className="form-check mb-4">
          <input
            type="checkbox"
            id="public"
            name="public"
            checked={formData.public}
            onChange={(e) => setFormData({ ...formData, public: e.target.checked })}
            className="form-check-input"
          />
          <label htmlFor="public" className="form-check-label">
            Rendi il post pubblico
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Pubblica post
        </button>
      </form>
    </div>
  );

}

export default App
