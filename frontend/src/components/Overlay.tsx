interface overlayInput {
    setShowOverlay:  React.Dispatch<React.SetStateAction<boolean>>
    setShowValidate:  React.Dispatch<React.SetStateAction<boolean>>
}
function Overlay({setShowOverlay, setShowValidate}: overlayInput) {
  return (
    <div className="bg-black fixed inset-0 z-1 opacity-95"
    onClick={() => (
        setShowOverlay(false), 
        setShowValidate(false)
    )
    }
    >
        
    </div>
  )
}

export default Overlay