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
    fontSize: 20,
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusBullet: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
});