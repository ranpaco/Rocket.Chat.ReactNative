import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';

import sharedStyles from '../../views/Styles';
import { themes } from '../../constants/colors';
import { CustomIcon } from '../../lib/Icons';
import { extractText } from './utils';
import { isAndroid, isIOS } from '../../utils/deviceInfo';

const styles = StyleSheet.create({
	iosPadding: {
		paddingVertical: 16
	},
	viewContainer: {
		paddingHorizontal: 16,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 2,
		justifyContent: 'center'
	},
	pickerText: {
		...sharedStyles.textRegular,
		fontSize: 16
	},
	icon: {
		right: 16
	}
});

export const StaticSelect = ({
	options,
	onChange,
	theme = 'light'
}) => {
	const items = options.map(option => ({ label: extractText(option.text), value: option.value }));
	const pickerStyle = {
		...styles.viewContainer,
		...(isIOS ? styles.iosPadding : {}),
		borderColor: themes[theme].auxiliaryTintColor
	};
	return (
		<RNPickerSelect
			items={items}
			placeholder={{}}
			useNativeAndroidPickerStyle={false}
			onValueChange={value => onChange({ value })}
			style={{
				viewContainer: pickerStyle,
				inputAndroidContainer: pickerStyle
			}}
			Icon={() => <CustomIcon size={22} name='arrow-down' style={isAndroid && styles.icon} color={themes[theme].auxiliaryText} />}
			textInputProps={{ style: { ...styles.pickerText, color: themes[theme].auxiliaryText } }}
		/>
	);
};
StaticSelect.propTypes = {
	options: PropTypes.array,
	onChange: PropTypes.func,
	theme: PropTypes.string
};
