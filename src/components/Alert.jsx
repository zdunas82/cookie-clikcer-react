function Alert({ message, isSuccess, onClose }) {
  return (
    <div style={{ backgroundColor: isSuccess ? 'green' : 'red', color: 'white', padding: '10px', marginBottom: '10px' }}>
      <span>{message}</span>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Alert;
