const Nweet = ({ nweetObj, isOwner }) => {
    return (
        <div>
            <h4>{nweetObj.nweet}</h4>
            {/* isOwner가 True일때 아래 보이게 */}
            {isOwner && (
                <>
                    <button>Delete Nweet</button>
                    <button>Edit Nweet</button>
                </>
            )}
        </div>
    );
};

export default Nweet;
