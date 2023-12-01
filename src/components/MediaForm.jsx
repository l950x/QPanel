import React from 'react'

const MediaForm = () => {
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <select
          name="media"
          value={formData.media}
          onChange={handleChange}
          placeholder="Which media ?"
        >
          <option value="">Which media ?</option>
          <option value="Instagram">Instagram</option>
          <option value="Tiktok">Tiktok</option>
          <option value="Youtube">Youtube</option>
        </select>

        <select
          name="services"
          value={formData.services}
          onChange={handleChange}
          placeholder="Which services ?"
        >
          <option value="">Which services ?</option>
          {formData.media === 'Youtube' ? (
            <option value="Dislike">Dislike</option>
          ) : null}
          <option value="Likes">Likes</option>
          <option value="Followers">Followers</option>
        </select>

        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Link (https://...)"
        />

        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="Quantity"
        />

        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default MediaForm
