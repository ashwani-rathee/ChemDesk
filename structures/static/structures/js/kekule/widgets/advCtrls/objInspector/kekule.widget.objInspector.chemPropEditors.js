/**
 * @fileoverview
 * Implementation of some special property editor for chem objects.
 * @author Partridge Jiang
 */


/*
 * requires /lan/classes.js
 * requires /utils/kekule.utils.js
 * requires /widgets/advCtrls/objInspector/kekule.widget.objectInspector.propEditors.js
 * requires /render/kekule.render.utils.js
 */

(function(){

"use strict";

var PEA = Kekule.PropertyEditor.EditorAttributes;

/**
 * A property editor that to edit id property of ChemObject.
 * @class
 * @augments Kekule.PropertyEditor.SimpleEditor
 */
Kekule.PropertyEditor.ChemIdEditor = Class.create(Kekule.PropertyEditor.SimpleEditor,
/** @lends Kekule.PropertyEditor.ChemIdEditor# */
{
	/** @private */
	CLASS_NAME: 'Kekule.PropertyEditor.ChemIdEditor',
	/** @ignore */
	getAttributes: function(/*$super*/)
	{
		var result = this.tryApplySuper('getAttributes')  /* $super() */;
		if (result & PEA.MULTIOBJS)
			result = result ^ PEA.MULTIOBJS;
		return result;
	}
});
Kekule.PropertyEditor.register(Kekule.PropertyEditor.ChemIdEditor, null, Kekule.ChemObject, 'id');

/**
 * A property editor that to edit coord2D/coord3D/size2D/size3D field.
 * @class
 * @augments Kekule.PropertyEditor.SimpleEditor
 */
Kekule.PropertyEditor.ChemCoordSizeFieldEditor = Class.create(Kekule.PropertyEditor.SimpleEditor,
/** @lends Kekule.PropertyEditor.ChemCoordSizeFieldEditor# */
{
	/** @private */
	CLASS_NAME: 'Kekule.PropertyEditor.ChemCoordSizeFieldEditor',
	initProperties: function()
	{
		this.defineProp('parentObjects', {'dataType': DataType.Object, 'serializable': false});
		this.defineProp('parentPropName', {'dataType': DataType.STRING, 'serializable': false});
	},
	getCoordFieldValue: function(objs, propName, field)
	{
		if (!objs.length)
			return undefined;
		var coordV = objs[0].getPropValue(propName);
		if (!coordV)
		{
			return undefined;
		}
		var result = coordV[field];
		for (var i = 1, l = objs.length; i < l; ++i)
		{
			var v = objs[i].getPropValue(propName)[field];
			if (v !== result)
				return undefined;
		}
		return result;
	},
	/** @ignore */
	getValue: function(/*$super*/)
	{
		var parentObjs = this.getParentObjects();
		var parentPropName = this.getParentPropName();
		if (parentObjs && parentPropName)
		{
			//console.log(parentObjs, parentPropName);
			return this.getCoordFieldValue(parentObjs, parentPropName, this.getPropertyName());
		}
		else
		{
			//console.log(parentObjs, parentPropName);
			return this.tryApplySuper('getValue')  /* $super() */;
		}
	}
});

/**
 * A property editor that to edit coord2D/coord3D and related properties of chem objects.
 * @class
 * @augments Kekule.PropertyEditor.BaseEditor
 */
Kekule.PropertyEditor.ChemCoordEditor = Class.create(Kekule.PropertyEditor.ObjectEditor,
/** @lends Kekule.PropertyEditor.ChemCoordEditor# */
{
	/** @private */
	CLASS_NAME: 'Kekule.PropertyEditor.ChemCoordEditor',
	/** @private */
	is3DCoord: function()
	{
		var propName = this.getPropertyName();
		return (propName.indexOf('3') >= 0);
	},
	/* @ignore */
	getFieldEditorClass: function(objs, fieldName)
	{
		return Kekule.PropertyEditor.ChemCoordSizeFieldEditor;
	},
	/** @ignore */
	createFieldEditor: function(/*$super, */objs, fieldInfo)
	{
		var result = this.tryApplySuper('createFieldEditor', [objs, fieldInfo])  /* $super(objs, fieldInfo) */;
		if (result.setParentObjects)
			result.setParentObjects(this.getObjects());
		if (result.setParentPropName)
			result.setParentPropName(this.getPropertyName());
		return result;
	},
	/** @ignore */
	getFieldValueType: function(obj, fieldName)
	{
		return DataType.FLOAT;
	},
	/** @private */
	getObjFields: function(obj)
	{
		return this.is3DCoord()? ['x', 'y', 'z']: ['x', 'y'];
	},
	/** @ignore */
	getValueText: function(/*$super*/)
	{
		var VDM = Kekule.Widget.ValueListEditor.ValueDisplayMode;
		var mode = this.getValueTextMode();
		if (mode === VDM.JSON)
			return this.tryApplySuper('getValueText')  /* $super() */;

		var value = this.getValue();
		if (value)
		{
			var fields = this.getObjFields();
			var result = '';
			for (var i = 0, l = fields.length; i < l; ++i)
			{
				var v = value[fields[i]];
				if (Kekule.ObjUtils.notUnset(v))
				{
					if (!!result)
						result += ', '
					result += fields[i] + ': ' + v;
				}
			}
			return '{' + result + '}';
		}
		else
			return '';
	}
});
Kekule.PropertyEditor.register(Kekule.PropertyEditor.ChemCoordEditor, null, Kekule.ChemObject, 'coord2D');
Kekule.PropertyEditor.register(Kekule.PropertyEditor.ChemCoordEditor, null, Kekule.ChemObject, 'coord3D');
Kekule.PropertyEditor.register(Kekule.PropertyEditor.ChemCoordEditor, null, Kekule.ChemObject, 'absCoord2D');
Kekule.PropertyEditor.register(Kekule.PropertyEditor.ChemCoordEditor, null, Kekule.ChemObject, 'absCoord3D');

/**
 * A property editor that to edit size2D/size3D and related properties of chem objects.
 * @class
 * @augments Kekule.PropertyEditor.BaseEditor
 */
Kekule.PropertyEditor.ChemSizeEditor = Class.create(Kekule.PropertyEditor.ObjectEditor,
/** @lends Kekule.PropertyEditor.ChemSizeEditor# */
{
	/** @private */
	CLASS_NAME: 'Kekule.PropertyEditor.ChemSizeEditor',
	/** @private */
	is3DSize: function()
	{
		var propName = this.getPropertyName();
		return (propName.indexOf('3') >= 0);
	},
	/* @ignore */
	getFieldEditorClass: function(objs, fieldName)
	{
		return Kekule.PropertyEditor.ChemCoordSizeFieldEditor;
	},
	/** @ignore */
	createFieldEditor: function(/*$super, */objs, fieldInfo)
	{
		var result = this.tryApplySuper('createFieldEditor', [objs, fieldInfo])  /* $super(objs, fieldInfo) */;
		if (result.setParentObjects)
			result.setParentObjects(this.getObjects());
		if (result.setParentPropName)
			result.setParentPropName(this.getPropertyName());
		return result;
	},
	/** @ignore */
	getFieldValueType: function(obj, fieldName)
	{
		return DataType.FLOAT;
	},
	/** @private */
	getObjFields: function(obj)
	{
		return this.is3DSize()? ['x', 'y', 'z']: ['x', 'y'];
	},
	/** @ignore */
	getValueText: function(/*$super*/)
	{
		var VDM = Kekule.Widget.ValueListEditor.ValueDisplayMode;
		var mode = this.getValueTextMode();
		if (mode === VDM.JSON)
			return this.tryApplySuper('getValueText')  /* $super() */;

		var value = this.getValue();
		if (value)
		{
			var fields = this.getObjFields();
			var result = '';
			for (var i = 0, l = fields.length; i < l; ++i)
			{
				var v = value[fields[i]];
				if (Kekule.ObjUtils.notUnset(v))
				{
					if (!!result)
						result += ', ';
					result += fields[i] + ': ' + v;
				}
			}
			return '{' + result + '}';
		}
		else
			return '';
	}
});
Kekule.PropertyEditor.register(Kekule.PropertyEditor.ChemSizeEditor, null, Kekule.ChemObject, 'size2D');
Kekule.PropertyEditor.register(Kekule.PropertyEditor.ChemSizeEditor, null, Kekule.ChemObject, 'size3D');
Kekule.PropertyEditor.register(Kekule.PropertyEditor.ChemSizeEditor, null, Kekule.ChemObject, 'screenSize');


/**
 * A base property editor that to edit renderOptions/render3DOptions and other predefined option object
 * property of chem objects.
 * @class
 * @augments Kekule.PropertyEditor.BaseEditor
 */
Kekule.PropertyEditor.ChemOptionObjectEditor = Class.create(Kekule.PropertyEditor.ObjectEditor,
/** @lends Kekule.PropertyEditor.ChemOptionObjectEditor# */
{
	/** @private */
	CLASS_NAME: 'Kekule.PropertyEditor.ChemOptionObjectEditor',
	/** @private */
	CHILD_FIELD_INFOS: null,
	/** @constructs **/
	initialize: function(/*$super*/)
	{
		this.tryApplySuper('initialize')  /* $super() */;
		this.setAllowEmpty(true);
	},

	/** @private */
	getObjFieldInfos: function(obj)
	{
		var baseClass = ClassEx.getCommonSuperClass(this.getObjects());
		var result = [];
		var infos = this.CHILD_FIELD_INFOS;
		for (var i = 0, l = infos.length; i < l; ++i)
		{
			var info = infos[i];
			if (!info.targetClass || !baseClass || ClassEx.isOrIsDescendantOf(baseClass, info.targetClass))
				result.push(info);
		}
		result.sort(function(a, b)
			{
				return (a.name > b.name)? 1:
					(a.name < b.name)? -1:
					0;
			}
		);
		return result;
	},

	/** @private */
	notifyChildEditorValueChange: function(/*$super, */fieldName, fieldValue)
	{
		var old = this.getValue() || this._initialObjValue;
		old = Object.extend({}, old);
		//console.log('changed', fieldName, fieldValue);
		if (Kekule.ObjUtils.notUnset(fieldValue))
			old[fieldName] = fieldValue;
		else  // fieldValue set to null or undefined, remove this field directly (otherwise may cause cascade draw option problem).
			delete old[fieldName];
		//old[fieldName] = fieldValue;
		//console.log('set value', old);
		this.setValue(old);
	}
});

/**
 * A property editor that to edit renderOptions property of chem objects.
 * @class
 * @augments Kekule.PropertyEditor.ChemOptionObjectEditor
 */
Kekule.PropertyEditor.ChemRender2DOptionsEditor = Class.create(Kekule.PropertyEditor.ChemOptionObjectEditor,
/** @lends Kekule.PropertyEditor.ChemRender2DOptionsEditor# */
{
	/** @private */
	CLASS_NAME: 'Kekule.PropertyEditor.ChemRender2DOptionsEditor',
	/** @private */
	CHILD_FIELD_INFOS: Kekule.Render.RenderOptionUtils.getOptionDefinitions()
});
Kekule.PropertyEditor.register(Kekule.PropertyEditor.ChemRender2DOptionsEditor, null, Kekule.ChemObject, 'renderOptions');

/**
 * A property editor that to edit render3DOptions property of chem objects.
 * @class
 * @augments Kekule.PropertyEditor.ChemOptionObjectEditor
 */
Kekule.PropertyEditor.ChemRender3DOptionsEditor = Class.create(Kekule.PropertyEditor.ChemOptionObjectEditor,
/** @lends Kekule.PropertyEditor.ChemRender3DOptionsEditor# */
{
	/** @private */
	CLASS_NAME: 'Kekule.PropertyEditor.ChemRender3DOptionsEditor',
	/** @private */
	CHILD_FIELD_INFOS: Kekule.Render.Render3DOptionUtils.getOptionDefinitions()
});
Kekule.PropertyEditor.register(Kekule.PropertyEditor.ChemRender3DOptionsEditor, null, Kekule.ChemObject, 'render3DOptions');

/**
 * A property editor that to edit pathParams property of PathGlyphConnector.
 * @class
 * @augments Kekule.PropertyEditor.ChemOptionObjectEditor
 */
Kekule.PropertyEditor.GlyphPathParamsEditor = Class.create(Kekule.PropertyEditor.ChemOptionObjectEditor,
/** @lends Kekule.PropertyEditor.GlyphPathParamsEditor# */
{
	/** @private */
	CLASS_NAME: 'Kekule.PropertyEditor.GlyphPathParamsEditor',
	/** @private */
	CHILD_FIELD_INFOS: [
		{'name': 'lineCount', dataType: DataType.INT, 'targetClass': Kekule.Glyph.PathGlyphConnector},
		{'name': 'lineGap', dataType: DataType.FLOAT, 'targetClass': Kekule.Glyph.PathGlyphConnector},
		{'name': 'startArrowType', dataType: DataType.STRING, 'enumSource': Kekule.Glyph.ArrowType, 'targetClass': Kekule.Glyph.PathGlyphConnector},
		{'name': 'startArrowSide', dataType: DataType.INT, 'enumSource': Kekule.Glyph.ArrowSide, 'targetClass': Kekule.Glyph.PathGlyphConnector},
		{'name': 'startArrowLength', dataType: DataType.FLOAT, 'targetClass': Kekule.Glyph.PathGlyphConnector},
		{'name': 'startArrowWidth', dataType: DataType.FLOAT, 'targetClass': Kekule.Glyph.PathGlyphConnector},
		{'name': 'endArrowType', dataType: DataType.INT, 'enumSource': Kekule.Glyph.ArrowType, 'targetClass': Kekule.Glyph.PathGlyphConnector},
		{'name': 'endArrowSide', dataType: DataType.INT, 'enumSource': Kekule.Glyph.ArrowSide, 'targetClass': Kekule.Glyph.PathGlyphConnector},
		{'name': 'endArrowLength', dataType: DataType.FLOAT, 'targetClass': Kekule.Glyph.PathGlyphConnector},
		{'name': 'endArrowWidth', dataType: DataType.FLOAT, 'targetClass': Kekule.Glyph.PathGlyphConnector}
		//{'name': 'autoOffset', dataType: DataType.BOOL, 'targetClass': Kekule.Glyph.PathGlyphConnector},
		//{'name': 'glyphStickOffsetRelLength', dataType: DataType.FLOAT, 'targetClass': Kekule.Glyph.PathGlyphConnector}
	]
});
Kekule.PropertyEditor.register(Kekule.PropertyEditor.GlyphPathParamsEditor, null, Kekule.Glyph.PathGlyphConnector, 'pathParams');

/**
 * A property editor that to edit pathNodeParams property of PathGlyphNode.
 * @class
 * @augments Kekule.PropertyEditor.ChemOptionObjectEditor
 */
Kekule.PropertyEditor.GlyphPathNodeParamsEditor = Class.create(Kekule.PropertyEditor.ChemOptionObjectEditor,
/** @lends Kekule.PropertyEditor.GlyphPathNodeParamsEditor# */
{
	/** @private */
	CLASS_NAME: 'Kekule.PropertyEditor.GlyphPathNodeParamsEditor',
	/** @private */
	CHILD_FIELD_INFOS: [
		{'name': 'useStickingOffset', dataType: DataType.BOOL, 'targetClass': Kekule.Glyph.PathGlyphNode},
		{'name': 'stickingOffsetRelLength', dataType: DataType.FLOAT, 'targetClass': Kekule.Glyph.PathGlyphNode}
	]
});
Kekule.PropertyEditor.register(Kekule.PropertyEditor.GlyphPathNodeParamsEditor, null, Kekule.Glyph.PathGlyphNode, 'pathNodeParams');

})();