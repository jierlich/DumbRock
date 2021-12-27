export default function ExternalButtons() {
  return (
    <div className="buttonContainer">
      <form action="https://google.com" target="_blank">
        <button className="externalButton">polygonscan</button>
      </form>
      <form action="https://google.com" target="_blank">
        <button className="externalButton">opensea</button>
      </form>
    </div>
  );
}
