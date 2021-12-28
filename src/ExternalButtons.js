export default function ExternalButtons() {
  return (
    <div className="buttonContainer">
      <form
        action="https://polygonscan.com/address/0xe850dD8b9D90F060BCA3A6C7f865228cF6C80062"
        target="_blank"
      >
        <button className="externalButton">polygonscan</button>
      </form>
      <form action="https://opensea.io/collection/dumbrock-v2" target="_blank">
        <button className="externalButton">opensea</button>
      </form>
    </div>
  );
}
