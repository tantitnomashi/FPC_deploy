const [dataTemplateArr, setDataTempleteArr] = useState([]);
//arr 2D  boxes, 

let dataView = generateView(res.data);
setDataTempleteArr(dataView);

const generateView = (items) => {
    let view = [];
    let data4View = [];
    for (let i = 0; i < exampleTemplate.colsCnt; i++) {
        view.push([]);
        data4View.push([]);
    }

    exampleTemplate.boxConfigurations.map((c) => {
        let index = c.topLeftPosition.indexOf(",");
        let top = parseInt(c.topLeftPosition.substr(0, index), 10);
        let left = parseInt(c.topLeftPosition.substr(index + 1, c.topLeftPosition.length), 10);

        let boxView = data4View[left - 1];
        let numBox = (c.boxSizeType.actualHeight) / 30;
        boxView.push({
            id: c.id,
            name: c.topLeftPosition,
            sizeName: c.boxSizeType.sizeName,
            top: top,
            numBox: numBox,
            w: c.boxSizeType.actualWidth,
            h: c.boxSizeType.actualHeight
        });

    });

    data4View.map((e, i) => {
        let currentIndex = 1;
        e.map((e1, iArr) => {
            let boxView = view[i];
            let indexTmp = e1.numBox;
            if (e1.top != currentIndex) {
                for (let iL = 0; iL < e1.top - currentIndex; iL++) {

                    boxView.push(Box(null, iArr, 30, 30));
                }
                currentIndex = e1.top;
            }
            currentIndex += indexTmp;
            if (e1.sizeName === "Large Potrait") {
                e1.h *= 3.05;
            }
            if (e1.sizeName === "Medium Potrait") {
                e1.h *= 2.4;
            }
            boxView.push(Box(items, e1, e1.w, e1.h));
        })
    });
    return view;
}

// create

const Box = (boxNums, e, w, h) => {
    if (e?.id && boxNums?.length > 2) {
        return <Div key={e.id}>
            {boxNums?.map((item) => {
                if (e.id == item.positionId) {
                    return <Button
                        key={item.id}
                        bg={item.rentingStatus === 1 ? "warning" : item.rentingStatus === 2 ? "danger" : "primary"}
                        p="md"
                        m={1} p="md" w={w + 100} h={h + 100}
                        shadow="sm"
                        justifyContent="center" alignItems="center"
                        onPress={() => {
                            setOverlayVisible(true);
                            setItemSelected(item);
                            //  onRequestOpen(item);
                        }}
                    >
                        <Icon name={item.status == 0 ? "lock" : item.status == 1 ? "lock-open" : "block"} fontFamily={item.status == 2 ? "Entypo" : "FontAwesome5"} fontSize="4xl" color="light" />
                        <Div flex={1} row>
                            <Div flex={1}>
                                <Text color="light" textAlign="center" fontWeight="bold" fontSize="xl">
                                    {`Tủ ${item.boxNum}`}
                                </Text>
                                <Text color="light" textAlign="center" fontWeight="bold" fontSize="xl">
                                    {item.rentingStatus === 1 ? "Đang thuê" : item.rentingStatus === 2 ? "Hết hạn" : "Tủ trống"}
                                </Text>
                            </Div>
                        </Div>
                    </Button>
                } else {
                    return null;
                }
            })
            }
        </Div>
    } else {
        return <Div key={e} bg="gray500" borderColor="gray500" borderWidth={1} m={1} p="md" w={w + 100} h={h + 100}>

        </Div>
    }
}


{
    dataTemplateArr.map((e, i) => (
        <Div key={i}>
            {e.map((b) => b)}
        </Div>
    ))
}