import DaumPostcodeEmbed from "react-daum-postcode";
import Modal from "react-modal";

let Address = ({modalState, setModalState, setAddressData}) => {
    let postStyle = {
        width: '500px',
        height: '700px',
        display: 'modalState' ? 'block' : 'null'
    }

    let onCompletePost = async (data) => {
        setModalState(false)
        setAddressData({
            address: data.address,
            sido: data.sido,
            sigungu: data.sigungu,
            zonecode: data.zonecode,
            buildingName: data.buildingName
        })

    }
    return (
        <Modal isOpen={modalState}
               onRequestClose={() => setModalState(false)}
               shouldCloseOnOverlayClick={false}
               ariaHideApp={false}>
            <DaumPostcodeEmbed style={postStyle} onComplete={onCompletePost}></DaumPostcodeEmbed>
        </Modal>
    )
}
export default Address