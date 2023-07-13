import { StyleSheet } from "react-native";

export default StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: "hidden"
  },
  itemImage: {
    width: 56,
    height: 56,
    marginRight: 8,
    borderRadius: 8
  },
  itemTitle: {
    fontSize: 20
  },
  itemSubtitle: {
    fontSize: 16,
  }
});