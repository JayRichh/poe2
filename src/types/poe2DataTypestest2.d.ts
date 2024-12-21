// Auto-generated with exclusions
// Excluding directories: metadata, xt, french, german, japanese, korean, portuguese, russian, spanish, thai, traditional chinese

declare namespace Poe2DataMain {
  export namespace Root {
  }

  export namespace Csd {
  }

  export namespace Data {
    interface data_abyssbosslifescalingperlevel_Item {
      Level?: number;
      Life?: number;
    }
    export interface data_abyssbosslifescalingperlevel extends Array<data_abyssbosslifescalingperlevel_Item> {}
    
    interface data_abyssobjects_Item {
      Id?: string;
      MinLevel?: number;
      MaxLevel?: number;
      SpawnWeight?: number;
      Unk004?: number;
      MetadataFile?: string;
      Unk006?: number;
      DaemonSpawners?: any[];
      Unk008?: number;
      Unk009?: number;
      AbyssalDepths?: any;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: number;
      Unk017?: number;
      Unk018?: number;
      Unk019?: number;
      Unk020?: boolean;
    }
    export interface data_abyssobjects extends Array<data_abyssobjects_Item> {}
    
    interface data_achievementitemrewards_Item {
      AchievementItemsKey?: data_achievementitemrewards_Item_AchievementItemsKey;
      BaseItemTypesKey?: data_achievementitemrewards_Item_BaseItemTypesKey;
      Message?: string;
      Id?: string;
    }
    interface data_achievementitemrewards_Item_AchievementItemsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_achievementitemrewards_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_achievementitemrewards extends Array<data_achievementitemrewards_Item> {}
    
    interface data_achievementitems_Item {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Name?: string;
      CompletionsRequired?: number;
      AchievementsKey?: data_achievementitems_Item_AchievementsKey;
      Unk006?: boolean;
      Unk007?: boolean;
      Unk008?: boolean;
      Unk009?: boolean;
    }
    interface data_achievementitems_Item_AchievementsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_achievementitems extends Array<data_achievementitems_Item> {}
    
    interface data_achievements_Item {
      Id?: string;
      Description?: string;
      SetId?: number;
      Objective?: string;
      HASH16?: number;
      Unk005?: boolean;
      HideAchievementItems?: boolean;
      Unk007?: boolean;
      MinCompletedItems?: number;
      TwoColumnLayout?: boolean;
      ShowItemCompletionsAsOne?: boolean;
      Unk011?: string;
      SoftcoreOnly?: boolean;
      HardcoreOnly?: boolean;
      Unk014?: boolean;
      Unk015?: string;
      Unk016?: string;
      Unk017?: string;
    }
    export interface data_achievements extends Array<data_achievements_Item> {}
    
    interface data_achievementsetrewards_Item {
      SetId?: number;
      AchievementsRequired?: number;
      Rewards?: any[];
      TotemPieceEveryNAchievements?: number;
      Message?: string;
      NotificationIcon?: string;
      HideoutName?: string;
      Id?: string;
    }
    export interface data_achievementsetrewards extends Array<data_achievementsetrewards_Item> {}
    
    interface data_achievementsetsdisplay_Item {
      Id?: number;
      Title?: string;
    }
    export interface data_achievementsetsdisplay extends Array<data_achievementsetsdisplay_Item> {}
    
    interface data_actiontypes_Item {
      Id?: string;
      Unk001?: number;
    }
    export interface data_actiontypes extends Array<data_actiontypes_Item> {}
    
    interface data_activesettings_Item {
      Unk000?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: data_activesettings_Item_Unk003;
      Unk004?: data_activesettings_Item_Unk004;
      Unk005?: data_activesettings_Item_Unk005;
      Unk006?: data_activesettings_Item_Unk006;
      Unk007?: number;
    }
    interface data_activesettings_Item_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_activesettings_Item_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_activesettings_Item_Unk005 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_activesettings_Item_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_activesettings extends Array<data_activesettings_Item> {}
    
    export type data_activeskillrequirementicons = any[];
    
    interface data_activeskillrequirements_Item {
      SomeRef01?: data_activeskillrequirements_Item_SomeRef01;
      SomeRef02?: data_activeskillrequirements_Item_SomeRef02;
      SomeInt01?: number;
      SomeBool01?: boolean;
      SomeInt02?: number;
    }
    interface data_activeskillrequirements_Item_SomeRef01 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_activeskillrequirements_Item_SomeRef02 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_activeskillrequirements extends Array<data_activeskillrequirements_Item> {}
    
    interface data_activeskills_Item {
      Id?: string;
      DisplayedName?: string;
      Description?: string;
      ActionType?: data_activeskills_Item_ActionType;
      Icon_DDSFile?: string;
      ActiveSkillTargetTypes?: number[];
      ActiveSkillTypes?: any[];
      WeaponRestriction_ItemClassesKeys?: any[];
      WebsiteDescription?: string;
      WebsiteImage?: string;
      Unk010?: boolean;
      Unk011?: string;
      Unk012?: boolean;
      SkillTotemId?: number;
      IsManuallyCasted?: boolean;
      Input_StatKeys?: any[];
      Output_StatKeys?: any[];
      MinionActiveSkillTypes?: any[];
      Unk018?: boolean;
      Unk019?: boolean;
      Unk020?: any[];
      Unk021?: number;
      AlternateSkillTargetingBehavioursKey?: any;
      Unk023?: boolean;
      AIFile?: string;
      Unk025?: any[];
      Unk026?: boolean;
      Unk027?: boolean;
      Unk028?: boolean;
      TransfigureBase?: any;
      Unk030?: number;
      AudioEvent?: data_activeskills_Item_AudioEvent;
      Unk032?: number;
      Unk033?: any;
      Unk034?: any;
      Unk035?: string;
      Unk036?: boolean;
      Unk037?: number;
      CsdPath?: string;
    }
    interface data_activeskills_Item_ActionType {
      TableName?: string;
      Id?: string;
    }
    interface data_activeskills_Item_AudioEvent {
      TableName?: string;
      Id?: string;
    }
    export interface data_activeskills extends Array<data_activeskills_Item> {}
    
    interface data_activeskilltype_Item {
      Id?: string;
      FlagStat?: data_activeskilltype_Item_FlagStat;
    }
    interface data_activeskilltype_Item_FlagStat {
      TableName?: string;
      Id?: string;
    }
    export interface data_activeskilltype extends Array<data_activeskilltype_Item> {}
    
    interface data_acts_Item {
      Id?: string;
      Part?: number;
      Unk002?: any;
      Unk003?: number;
      ActNumber?: number;
      WorldPanelImage?: string;
      WorldPanelImageEpilogue?: any;
      Unk007?: number;
      IsPostGame?: boolean;
      Unk009?: number;
      Unk010?: any[];
    }
    export interface data_acts extends Array<data_acts_Item> {}
    
    interface data_addbufftotargetvarieties_Item {
      BuffDefinitions?: data_addbufftotargetvarieties_Item_BuffDefinitions;
      Unk001?: any[];
      StatsKeys?: any[];
      Unk003?: number;
      Unk004?: any[];
      Unk005?: number;
      Unk006?: number;
      Unk007?: any[];
    }
    interface data_addbufftotargetvarieties_Item_BuffDefinitions {
      TableName?: string;
      Id?: string;
    }
    export interface data_addbufftotargetvarieties extends Array<data_addbufftotargetvarieties_Item> {}
    
    export type data_additionallifescaling = any[];
    
    export type data_additionallifescalingperlevel = any[];
    
    interface data_additionalmonsterpacksfromstats_Item {
      StatsKey?: data_additionalmonsterpacksfromstats_Item_StatsKey;
      Unk001?: number;
      MonsterPacksKeys?: any[];
      AdditionalMonsterPacksStatMode?: number;
      PackCountStatsKey?: any;
      StatsKeys?: any[];
      StatsValues?: any[];
      Unk007?: number;
      PackSizeStatsKey?: any;
    }
    interface data_additionalmonsterpacksfromstats_Item_StatsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_additionalmonsterpacksfromstats extends Array<data_additionalmonsterpacksfromstats_Item> {}
    
    export type data_advancedcraftingbenchcustomtags = any[];
    
    export type data_advancedcraftingbenchtabfiltertypes = any[];
    
    interface data_advancedskillstutorial_Item {
      Id?: string;
      SkillGemInfoKey1?: any[];
      SkillGemInfoKey2?: any[];
      Description?: string;
      International_BK2File?: string;
      SkillGemsKey?: any;
      China_BK2File?: string;
      CharactersKey?: any[];
    }
    export interface data_advancedskillstutorial extends Array<data_advancedskillstutorial_Item> {}
    
    interface data_aegisvariations_Item {
      Name?: string;
      DefendsAgainstPhysical?: boolean;
      DefendsAgainstFire?: boolean;
      DefendsAgainstCold?: boolean;
      DefendsAgainstLightning?: boolean;
      DefendsAgainstChaos?: boolean;
      Unk006?: data_aegisvariations_Item_Unk006;
      Unk007?: data_aegisvariations_Item_Unk007;
      Unk008?: data_aegisvariations_Item_Unk008;
      Unk009?: data_aegisvariations_Item_Unk009;
      Unk010?: any[];
    }
    interface data_aegisvariations_Item_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_aegisvariations_Item_Unk007 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_aegisvariations_Item_Unk008 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_aegisvariations_Item_Unk009 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_aegisvariations extends Array<data_aegisvariations_Item> {}
    
    interface data_afflictionbalanceperlevel_Item {
      Unk000?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
    }
    export interface data_afflictionbalanceperlevel extends Array<data_afflictionbalanceperlevel_Item> {}
    
    interface data_afflictionendgamewavemods_Item {
      ModsKey?: data_afflictionendgamewavemods_Item_ModsKey;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
    }
    interface data_afflictionendgamewavemods_Item_ModsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_afflictionendgamewavemods extends Array<data_afflictionendgamewavemods_Item> {}
    
    interface data_afflictionfixedmods_Item {
      Rarity?: number;
      Mod?: data_afflictionfixedmods_Item_Mod;
      Unk002?: data_afflictionfixedmods_Item_Unk002;
    }
    interface data_afflictionfixedmods_Item_Mod {
      TableName?: string;
      Id?: string;
    }
    interface data_afflictionfixedmods_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_afflictionfixedmods extends Array<data_afflictionfixedmods_Item> {}
    
    interface data_afflictionrandommodcategories_Item {
      Id?: string;
      Unk001?: boolean;
    }
    export interface data_afflictionrandommodcategories extends Array<data_afflictionrandommodcategories_Item> {}
    
    interface data_afflictionrewardmapmods_Item {
      ModsKey?: data_afflictionrewardmapmods_Item_ModsKey;
      Unk001?: boolean;
    }
    interface data_afflictionrewardmapmods_Item_ModsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_afflictionrewardmapmods extends Array<data_afflictionrewardmapmods_Item> {}
    
    interface data_afflictionrewardtypevisuals_Item {
      AfflictionRewardTypes?: number;
      Id?: string;
      Name?: string;
    }
    export interface data_afflictionrewardtypevisuals extends Array<data_afflictionrewardtypevisuals_Item> {}
    
    interface data_afflictionsplitdemons_Item {
      Unk000?: number;
      MonsterVarietiesKey?: data_afflictionsplitdemons_Item_MonsterVarietiesKey;
      AfflictionRandomModCategoriesKey?: data_afflictionsplitdemons_Item_AfflictionRandomModCategoriesKey;
    }
    interface data_afflictionsplitdemons_Item_MonsterVarietiesKey {
      TableName?: string;
      Id?: string;
    }
    interface data_afflictionsplitdemons_Item_AfflictionRandomModCategoriesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_afflictionsplitdemons extends Array<data_afflictionsplitdemons_Item> {}
    
    export type data_afflictionstartdialogue = any[];
    
    interface data_alternatepassiveadditions_Item {
      Id?: string;
      AlternateTreeVersionsKey?: data_alternatepassiveadditions_Item_AlternateTreeVersionsKey;
      SpawnWeight?: number;
      StatsKeys?: any[];
      Stat1Min?: number;
      Stat1Max?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      PassiveType?: number[];
      Unk011?: number;
    }
    interface data_alternatepassiveadditions_Item_AlternateTreeVersionsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_alternatepassiveadditions extends Array<data_alternatepassiveadditions_Item> {}
    
    interface data_alternatepassiveskills_Item {
      Id?: string;
      AlternateTreeVersionsKey?: data_alternatepassiveskills_Item_AlternateTreeVersionsKey;
      Name?: string;
      PassiveType?: number[];
      StatsKeys?: any[];
      Stat1Min?: number;
      Stat1Max?: number;
      Stat2Min?: number;
      Stat2Max?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: number;
      SpawnWeight?: number;
      Unk018?: number;
      RandomMin?: number;
      RandomMax?: number;
      FlavourText?: string;
      DDSIcon?: string;
      AchievementItemsKeys?: any[];
      Unk024?: number;
      Unk025?: number;
    }
    interface data_alternatepassiveskills_Item_AlternateTreeVersionsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_alternatepassiveskills extends Array<data_alternatepassiveskills_Item> {}
    
    export type data_alternatequalitytypes = any[];
    
    interface data_alternateskilltargetingbehaviours_Item {
      Id?: string;
      Unk001?: number;
      ClientStrings?: data_alternateskilltargetingbehaviours_Item_ClientStrings;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number[];
    }
    interface data_alternateskilltargetingbehaviours_Item_ClientStrings {
      TableName?: string;
      Id?: string;
    }
    export interface data_alternateskilltargetingbehaviours extends Array<data_alternateskilltargetingbehaviours_Item> {}
    
    interface data_alternatetreeart_Item {
      Unk000?: data_alternatetreeart_Item_Unk000;
      Circle1?: string;
      Circle2?: string;
      Glow?: string;
    }
    interface data_alternatetreeart_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_alternatetreeart extends Array<data_alternatetreeart_Item> {}
    
    interface data_alternatetreeversions_Item {
      Id?: string;
      Unk001?: boolean;
      Unk002?: boolean;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
    }
    export interface data_alternatetreeversions extends Array<data_alternatetreeversions_Item> {}
    
    export type data_ancestraltrialunits = any[];
    
    interface data_animatedobjectflags_Item {
      AOFile?: string;
      Unk001?: number;
      Unk002?: boolean;
      Unk003?: boolean;
    }
    export interface data_animatedobjectflags extends Array<data_animatedobjectflags_Item> {}
    
    export type data_animateweaponuniques = any[];
    
    interface data_animation_Item {
      Id?: string;
      Unk001?: boolean;
      Unk002?: boolean;
      Unk003?: boolean;
      Mainhand_AnimationKey?: any;
      Offhand_AnimationKey?: any;
      Unk006?: boolean;
      Unk007?: any;
      Unk008?: any;
      Unk009?: boolean;
      Unk010?: any;
      Unk011?: any[];
    }
    export interface data_animation extends Array<data_animation_Item> {}
    
    interface data_applydamagefunctions_Item {
      Id?: string;
      StatsKeys?: any[];
      Unk002?: boolean;
    }
    export interface data_applydamagefunctions extends Array<data_applydamagefunctions_Item> {}
    
    export type data_archetyperewards = any[];
    
    interface data_archetypes_Item {
      Id?: string;
      CharactersKey?: any;
      PassiveSkillTreeURL?: string;
      AscendancyClassName?: string;
      Description?: string;
      UIImageFile?: string;
      TutorialVideo_BKFile?: string;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      BackgroundImageFile?: string;
      IsTemporary?: boolean;
      Unk012?: boolean;
      ArchetypeImage?: string;
      Unk014?: boolean;
      Unk015?: boolean;
    }
    export interface data_archetypes extends Array<data_archetypes_Item> {}
    
    interface data_architectlifescalingperlevel_Item {
      Level?: number;
      MoreLife?: number;
    }
    export interface data_architectlifescalingperlevel extends Array<data_architectlifescalingperlevel_Item> {}
    
    interface data_archnemesismetarewards_Item {
      Id?: string;
      RewardText?: string;
      RewardGroup?: number;
      ScriptArgument?: string;
      MinLevel?: number;
      MaxLevel?: number;
    }
    export interface data_archnemesismetarewards extends Array<data_archnemesismetarewards_Item> {}
    
    export type data_archnemesismodcomboachievements = any[];
    
    interface data_archnemesismods_Item {
      Mod?: data_archnemesismods_Item_Mod;
      Name?: string;
      Visual?: any;
      TextStyles?: any[];
      Unk004?: boolean;
      Unk005?: boolean;
    }
    interface data_archnemesismods_Item_Mod {
      TableName?: string;
      Id?: string;
    }
    export interface data_archnemesismods extends Array<data_archnemesismods_Item> {}
    
    interface data_archnemesismodvisuals_Item {
      Id?: string;
      Unk001?: any;
      Unk002?: any;
      Unk003?: data_archnemesismodvisuals_Item_Unk003;
      Unk004?: any[];
      Unk005?: any[];
      Unk006?: any[];
      Unk007?: any[];
    }
    interface data_archnemesismodvisuals_Item_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_archnemesismodvisuals extends Array<data_archnemesismodvisuals_Item> {}
    
    export type data_archnemesisrecipes = any[];
    
    export type data_areadifficultystats = any[];
    
    interface data_areainfluencedoodads_Item {
      StatsKey?: data_areainfluencedoodads_Item_StatsKey;
      StatValue?: number;
      Unk002?: number;
      AOFiles?: string[];
      Unk004?: number;
      Unk005?: boolean;
      Unk006?: string;
      Unk007?: any;
    }
    interface data_areainfluencedoodads_Item_StatsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_areainfluencedoodads extends Array<data_areainfluencedoodads_Item> {}
    
    export type data_areastatsperdifficulty = any[];
    
    export type data_areatransitionanimations = any[];
    
    interface data_areatransitionanimationtypes_Item {
      Id?: string;
    }
    export interface data_areatransitionanimationtypes extends Array<data_areatransitionanimationtypes_Item> {}
    
    export type data_areatransitioninfo = any[];
    
    interface data_armourtypes_Item {
      BaseItemTypesKey?: data_armourtypes_Item_BaseItemTypesKey;
      Armour?: number;
      EvasionRating?: number;
      EnergyShield?: number;
      Unk02?: number;
      Unk03?: number;
      Unk04?: number;
    }
    interface data_armourtypes_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_armourtypes extends Array<data_armourtypes_Item> {}
    
    export type data_arrowspearoverride = any[];
    
    export type data_arrowstatreference = any[];
    
    interface data_ascendancy_Item {
      Id?: string;
      ClassNo?: number;
      Characters?: any[];
      CoordinateRect?: string;
      RGBFlavourTextColour?: string;
      Name?: string;
      FlavourText?: string;
      OGGFile?: string;
      PassiveTreeImage?: string;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: boolean;
    }
    export interface data_ascendancy extends Array<data_ascendancy_Item> {}
    
    export type data_atlasexilebossarenas = any[];
    
    interface data_atlasexileinfluence_Item {
      Conqueror?: data_atlasexileinfluence_Item_Conqueror;
      Sets?: any[];
    }
    interface data_atlasexileinfluence_Item_Conqueror {
      TableName?: string;
      Id?: string;
    }
    export interface data_atlasexileinfluence extends Array<data_atlasexileinfluence_Item> {}
    
    interface data_atlasexiles_Item {
      Id?: string;
      Unk001?: number;
      InfluencedItemIncrStat?: data_atlasexiles_Item_InfluencedItemIncrStat;
      MapIcon?: string;
      MapIcon2?: string;
    }
    interface data_atlasexiles_Item_InfluencedItemIncrStat {
      TableName?: string;
      Id?: string;
    }
    export interface data_atlasexiles extends Array<data_atlasexiles_Item> {}
    
    interface data_atlasfavouredmapslots_Item {
      Unk000?: number;
      Unk001?: number;
      Requirement?: string;
    }
    export interface data_atlasfavouredmapslots extends Array<data_atlasfavouredmapslots_Item> {}
    
    interface data_atlasfog_Item {
      Unk000?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
    }
    export interface data_atlasfog extends Array<data_atlasfog_Item> {}
    
    interface data_atlasinfluencedata_Item {
      InfluencePack?: data_atlasinfluencedata_Item_InfluencePack;
      MonsterPacks?: any[];
      Unk002?: any;
      Unk003?: any[];
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: any[];
      Unk009?: number;
      Unk010?: number;
      Unk011?: data_atlasinfluencedata_Item_Unk011;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: boolean;
      Unk017?: boolean;
      Unk018?: boolean;
      Unk019?: boolean;
    }
    interface data_atlasinfluencedata_Item_InfluencePack {
      TableName?: string;
      Id?: string;
    }
    interface data_atlasinfluencedata_Item_Unk011 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_atlasinfluencedata extends Array<data_atlasinfluencedata_Item> {}
    
    interface data_atlasinfluenceoutcomes_Item {
      Id?: string;
      Unk001?: number;
      Type?: number;
    }
    export interface data_atlasinfluenceoutcomes extends Array<data_atlasinfluenceoutcomes_Item> {}
    
    interface data_atlasinfluencesets_Item {
      Id?: string;
      InfluencePacks?: any[];
    }
    export interface data_atlasinfluencesets extends Array<data_atlasinfluencesets_Item> {}
    
    interface data_atlasmemoryline_Item {
      League?: string;
      League2?: string;
      StartPointArt?: string;
      MidPointArt?: string;
      EndPointArt?: string;
      PathArt?: string;
    }
    export interface data_atlasmemoryline extends Array<data_atlasmemoryline_Item> {}
    
    interface data_atlasmods_Item {
      ModsKey?: data_atlasmods_Item_ModsKey;
      AtlasModTiers?: number;
    }
    interface data_atlasmods_Item_ModsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_atlasmods extends Array<data_atlasmods_Item> {}
    
    export type data_atlasnode = any[];
    
    export type data_atlasnodedefinition = any[];
    
    export type data_atlaspassiveskillsubtrees = any[];
    
    interface data_atlaspassiveskilltreegrouptype_Item {
      Id?: string;
    }
    export interface data_atlaspassiveskilltreegrouptype extends Array<data_atlaspassiveskilltreegrouptype_Item> {}
    
    export type data_atlaspoem = any[];
    
    interface data_atlaspositions_Item {
      Unk000?: number;
      Unk001?: number;
      X?: number;
      Y?: number;
    }
    export interface data_atlaspositions extends Array<data_atlaspositions_Item> {}
    
    export type data_atlasprimordialaltarchoices = any[];
    
    interface data_atlasprimordialaltarchoicetypes_Item {
      Id?: string;
      TopIconEater?: string;
      BottomIconEater?: string;
      TopIconExarch?: string;
      BottomIconExarch?: string;
      Text?: string;
    }
    export interface data_atlasprimordialaltarchoicetypes extends Array<data_atlasprimordialaltarchoicetypes_Item> {}
    
    interface data_atlasprimordialbosses_Item {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      InfluenceComplete?: data_atlasprimordialbosses_Item_InfluenceComplete;
      MiniBossInvitation?: data_atlasprimordialbosses_Item_MiniBossInvitation;
      BossInvitation?: data_atlasprimordialbosses_Item_BossInvitation;
      PickUpKey?: data_atlasprimordialbosses_Item_PickUpKey;
      Unk009?: data_atlasprimordialbosses_Item_Unk009;
      Unk010?: data_atlasprimordialbosses_Item_Unk010;
      Tag?: data_atlasprimordialbosses_Item_Tag;
      Altar?: data_atlasprimordialbosses_Item_Altar;
      AltarActivated?: data_atlasprimordialbosses_Item_AltarActivated;
    }
    interface data_atlasprimordialbosses_Item_InfluenceComplete {
      TableName?: string;
      Id?: string;
    }
    interface data_atlasprimordialbosses_Item_MiniBossInvitation {
      TableName?: string;
      Id?: string;
    }
    interface data_atlasprimordialbosses_Item_BossInvitation {
      TableName?: string;
      Id?: string;
    }
    interface data_atlasprimordialbosses_Item_PickUpKey {
      TableName?: string;
      Id?: string;
    }
    interface data_atlasprimordialbosses_Item_Unk009 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_atlasprimordialbosses_Item_Unk010 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_atlasprimordialbosses_Item_Tag {
      TableName?: string;
      Id?: string;
    }
    interface data_atlasprimordialbosses_Item_Altar {
      TableName?: string;
      Id?: string;
    }
    interface data_atlasprimordialbosses_Item_AltarActivated {
      TableName?: string;
      Id?: string;
    }
    export interface data_atlasprimordialbosses extends Array<data_atlasprimordialbosses_Item> {}
    
    interface data_atlasprimordialbossinfluence_Item {
      Boss?: data_atlasprimordialbossinfluence_Item_Boss;
      Progress?: number;
      MinMapTier?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: any;
      Unk006?: number;
      Unk007?: any;
    }
    interface data_atlasprimordialbossinfluence_Item_Boss {
      TableName?: string;
      Id?: string;
    }
    export interface data_atlasprimordialbossinfluence extends Array<data_atlasprimordialbossinfluence_Item> {}
    
    interface data_atlasprimordialbossoptions_Item {
      Unk000?: number;
      Unk001?: number;
      DefaultIcon?: string;
      HoverIcon?: string;
      HighlightIcon?: string;
      EmptyIcon?: string;
      Description?: data_atlasprimordialbossoptions_Item_Description;
      DescriptionActive?: data_atlasprimordialbossoptions_Item_DescriptionActive;
      ProgressTracker?: string;
      ProgressTrackerFill?: string;
      Name?: string;
      MapDeviceTrackerFill?: string;
    }
    interface data_atlasprimordialbossoptions_Item_Description {
      TableName?: string;
      Id?: string;
    }
    interface data_atlasprimordialbossoptions_Item_DescriptionActive {
      TableName?: string;
      Id?: string;
    }
    export interface data_atlasprimordialbossoptions extends Array<data_atlasprimordialbossoptions_Item> {}
    
    interface data_atlasupgradesinventorylayout_Item {
      Id?: string;
      Unk001?: number;
      Voidstone?: data_atlasupgradesinventorylayout_Item_Voidstone;
      Unk003?: number;
      Objective?: string;
      GrantAtlasUpgrade?: data_atlasupgradesinventorylayout_Item_GrantAtlasUpgrade;
      Unk006?: data_atlasupgradesinventorylayout_Item_Unk006;
    }
    interface data_atlasupgradesinventorylayout_Item_Voidstone {
      TableName?: string;
      Id?: string;
    }
    interface data_atlasupgradesinventorylayout_Item_GrantAtlasUpgrade {
      TableName?: string;
      Id?: string;
    }
    interface data_atlasupgradesinventorylayout_Item_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_atlasupgradesinventorylayout extends Array<data_atlasupgradesinventorylayout_Item> {}
    
    interface data_attributerequirements_Item {
      BaseItemTypesKey?: data_attributerequirements_Item_BaseItemTypesKey;
      Strength?: number;
      Intelligence?: number;
      Dexterity?: number;
    }
    interface data_attributerequirements_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_attributerequirements extends Array<data_attributerequirements_Item> {}
    
    export type data_awarddisplay = any[];
    
    interface data_backenderrors_Item {
      Id?: string;
      Text?: string;
    }
    export interface data_backenderrors extends Array<data_backenderrors_Item> {}
    
    export type data_ballisticbouncebehaviour = any[];
    
    export type data_ballisticbounceoverride = any[];
    
    interface data_baseitemtypes_Item {
      Id?: string;
      ItemClassesKey?: data_baseitemtypes_Item_ItemClassesKey;
      Width?: number;
      Height?: number;
      Name?: string;
      InheritsFrom?: string;
      DropLevel?: number;
      FlavourTextKey?: any;
      Implicit_ModsKeys?: any[];
      SizeOnGround?: number;
      SoundEffect?: data_baseitemtypes_Item_SoundEffect;
      TagsKeys?: any[];
      ModDomain?: number;
      SiteVisibility?: number;
      ItemVisualIdentity?: data_baseitemtypes_Item_ItemVisualIdentity;
      HASH32?: number;
      VendorRecipe_AchievementItems?: any[];
      Inflection?: string;
      Equip_AchievementItemsKey?: any;
      IsCorrupted?: boolean;
      Identify_AchievementItems?: any[];
      IdentifyMagic_AchievementItems?: any[];
      FragmentBaseItemTypesKey?: any;
      Unk023?: boolean;
      Unk024?: any;
      Unk025?: any;
      Unk026?: boolean;
      TradeMarketCategory?: any;
      Unmodifiable?: boolean;
      Achievement?: any[];
      Unk030?: any;
      Unk031?: any;
      Unk032?: boolean;
    }
    interface data_baseitemtypes_Item_ItemClassesKey {
      TableName?: string;
      Id?: string;
    }
    interface data_baseitemtypes_Item_SoundEffect {
      TableName?: string;
      Id?: string;
    }
    interface data_baseitemtypes_Item_ItemVisualIdentity {
      TableName?: string;
      Id?: string;
    }
    export interface data_baseitemtypes extends Array<data_baseitemtypes_Item> {}
    
    interface data_battlepasses_Item {
      Id?: string;
      LeagueCategory?: number;
      International_BK2File?: string;
      China_BK2File?: string;
      MapCompletionCount?: number;
      Unk005?: boolean;
      Id2?: string;
    }
    export interface data_battlepasses extends Array<data_battlepasses_Item> {}
    
    interface data_battlepassrewards_Item {
      BattlePass?: data_battlepassrewards_Item_BattlePass;
      RewardTier?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: boolean;
      Id?: string;
      RewardedMTX?: any[];
      Unk007?: number;
      RewardDescription?: string;
      Unk009?: string;
      Unk010?: number;
      Unk011?: number;
      Unk012?: boolean;
      RewardTitle?: string;
      Unk014?: any;
      Unk015?: boolean;
      Unk016?: number;
      Unk017?: number;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
      Unk021?: number;
      Unk022?: number;
      Unk023?: number;
      Unk024?: boolean;
      Unk025?: boolean;
      Unk026?: boolean;
    }
    interface data_battlepassrewards_Item_BattlePass {
      TableName?: string;
      Id?: string;
    }
    export interface data_battlepassrewards extends Array<data_battlepassrewards_Item> {}
    
    interface data_battlepasstracks_Item {
      Id?: string;
      Description?: string;
    }
    export interface data_battlepasstracks extends Array<data_battlepasstracks_Item> {}
    
    interface data_belttypes_Item {
      BaseItemTypesKey?: data_belttypes_Item_BaseItemTypesKey;
      CharmSlots?: number;
    }
    interface data_belttypes_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_belttypes extends Array<data_belttypes_Item> {}
    
    export type data_bestiarycapturablemonsters = any[];
    
    export type data_bestiaryencounters = any[];
    
    interface data_bestiaryfamilies_Item {
      Id?: string;
      Name?: string;
      Icon?: string;
      IconSmall?: string;
      Illustration?: string;
      PageArt?: string;
      FlavourText?: string;
      Unk007?: boolean;
      TagsKey?: data_bestiaryfamilies_Item_TagsKey;
      Unk009?: number;
      ModsKeys?: any[];
      CurrencyItemsKey?: data_bestiaryfamilies_Item_CurrencyItemsKey;
    }
    interface data_bestiaryfamilies_Item_TagsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_bestiaryfamilies_Item_CurrencyItemsKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface data_bestiaryfamilies extends Array<data_bestiaryfamilies_Item> {}
    
    interface data_bestiarygenus_Item {
      Id?: string;
      Name?: string;
      BestiaryGroupsKey?: data_bestiarygenus_Item_BestiaryGroupsKey;
      Name2?: string;
      Icon?: string;
    }
    interface data_bestiarygenus_Item_BestiaryGroupsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_bestiarygenus extends Array<data_bestiarygenus_Item> {}
    
    interface data_bestiarygroups_Item {
      Id?: string;
      Description?: string;
      Illustration?: string;
      Name?: string;
      Icon?: string;
      IconSmall?: string;
      BestiaryFamiliesKey?: data_bestiarygroups_Item_BestiaryFamiliesKey;
      AchievementItemsKeys?: any[];
    }
    interface data_bestiarygroups_Item_BestiaryFamiliesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_bestiarygroups extends Array<data_bestiarygroups_Item> {}
    
    interface data_bestiarynets_Item {
      BaseItemTypesKey?: data_bestiarynets_Item_BaseItemTypesKey;
      Unk001?: number;
      CaptureMinLevel?: number;
      CaptureMaxLevel?: number;
      DropMinLevel?: number;
      DropMaxLevel?: number;
      Unk006?: number;
      IsEnabled?: boolean;
    }
    interface data_bestiarynets_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_bestiarynets extends Array<data_bestiarynets_Item> {}
    
    interface data_bestiaryrecipecategories_Item {
      Id?: string;
      Text?: string;
    }
    export interface data_bestiaryrecipecategories extends Array<data_bestiaryrecipecategories_Item> {}
    
    interface data_bestiaryrecipecomponent_Item {
      Id?: string;
      MinLevel?: number;
      BestiaryFamiliesKey?: any;
      BestiaryGroupsKey?: any;
      ModsKey?: any;
      BestiaryCapturableMonstersKey?: any;
      BeastRarity?: any;
      BestiaryGenusKey?: any;
    }
    export interface data_bestiaryrecipecomponent extends Array<data_bestiaryrecipecomponent_Item> {}
    
    interface data_bestiaryrecipes_Item {
      Id?: string;
      Description?: string;
      BestiaryRecipeComponentKeys?: any[];
      Notes?: string;
      Category?: data_bestiaryrecipes_Item_Category;
      Unk005?: boolean;
      Achievements?: any[];
      Unk007?: boolean;
      Unk008?: number;
      Unk009?: number;
      GameMode?: number;
      FlaskMod?: any;
    }
    interface data_bestiaryrecipes_Item_Category {
      TableName?: string;
      Id?: string;
    }
    export interface data_bestiaryrecipes extends Array<data_bestiaryrecipes_Item> {}
    
    interface data_betrayalchoiceactions_Item {
      Id?: string;
      BetrayalChoicesKey?: data_betrayalchoiceactions_Item_BetrayalChoicesKey;
      ClientStringsKey?: any;
    }
    interface data_betrayalchoiceactions_Item_BetrayalChoicesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_betrayalchoiceactions extends Array<data_betrayalchoiceactions_Item> {}
    
    interface data_betrayalchoices_Item {
      Id?: string;
      Text?: string;
      Unk002?: number;
      Achievements?: any[];
    }
    export interface data_betrayalchoices extends Array<data_betrayalchoices_Item> {}
    
    export type data_betrayaldialogue = any[];
    
    export type data_betrayalforts = any[];
    
    interface data_betrayaljobs_Item {
      Id?: string;
      Text?: string;
      ExtraTerrainFeaturesKey?: any;
      Art?: string;
      Unk004?: number;
      Unk005?: number;
      WorldAreasKey?: any;
      Completion_AchievementItemsKey?: any[];
      OpenChests_AchievementItemsKey?: any[];
      MissionCompletion_AcheivementItemsKey?: any[];
    }
    export interface data_betrayaljobs extends Array<data_betrayaljobs_Item> {}
    
    interface data_betrayalranks_Item {
      Id?: string;
      Text?: string;
      Level?: number;
      RankImage?: string;
    }
    export interface data_betrayalranks extends Array<data_betrayalranks_Item> {}
    
    interface data_betrayalrelationshipstate_Item {
      Id?: string;
      Text?: string;
    }
    export interface data_betrayalrelationshipstate extends Array<data_betrayalrelationshipstate_Item> {}
    
    interface data_betrayaltargetjobachievements_Item {
      BetrayalTargetsKey?: data_betrayaltargetjobachievements_Item_BetrayalTargetsKey;
      BetrayalJobsKey?: data_betrayaltargetjobachievements_Item_BetrayalJobsKey;
      AchievementItemsKey?: data_betrayaltargetjobachievements_Item_AchievementItemsKey;
    }
    interface data_betrayaltargetjobachievements_Item_BetrayalTargetsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_betrayaltargetjobachievements_Item_BetrayalJobsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_betrayaltargetjobachievements_Item_AchievementItemsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_betrayaltargetjobachievements extends Array<data_betrayaltargetjobachievements_Item> {}
    
    interface data_betrayaltargetlifescalingperlevel_Item {
      Level?: number;
      MoreLife?: number;
    }
    export interface data_betrayaltargetlifescalingperlevel extends Array<data_betrayaltargetlifescalingperlevel_Item> {}
    
    interface data_betrayaltargets_Item {
      Id?: string;
      BetrayalRanksKey?: any;
      MonsterVarietiesKey?: any;
      BetrayalJobsKey?: any;
      Art?: string;
      Unk005?: boolean;
      ItemClasses?: any;
      FullName?: string;
      Safehouse_ARMFile?: string;
      ShortName?: string;
      Unk010?: number;
      SafehouseLeader_AcheivementItemsKey?: any;
      Level3_AchievementItemsKey?: any;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: any;
      ScriptArgument?: string;
    }
    export interface data_betrayaltargets extends Array<data_betrayaltargets_Item> {}
    
    interface data_betrayaltraitorrewards_Item {
      BetrayalJobsKey?: data_betrayaltraitorrewards_Item_BetrayalJobsKey;
      BetrayalTargetsKey?: data_betrayaltraitorrewards_Item_BetrayalTargetsKey;
      BetrayalRanksKey?: data_betrayaltraitorrewards_Item_BetrayalRanksKey;
      Description?: string;
      Description2?: string;
    }
    interface data_betrayaltraitorrewards_Item_BetrayalJobsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_betrayaltraitorrewards_Item_BetrayalTargetsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_betrayaltraitorrewards_Item_BetrayalRanksKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_betrayaltraitorrewards extends Array<data_betrayaltraitorrewards_Item> {}
    
    interface data_betrayalupgrades_Item {
      Id?: string;
      Name?: string;
      Description?: string;
      ModsKey?: any[];
      ArtFile?: string;
      BetrayalUpgradeSlotsKey?: number;
      Unk006?: any[];
      ItemVisualIdentityKey0?: any;
      ItemVisualIdentityKey1?: any;
      GrantedEffectsKey?: any;
      Unk010?: number;
      ItemClassesKey?: any;
    }
    export interface data_betrayalupgrades extends Array<data_betrayalupgrades_Item> {}
    
    interface data_betrayalwalllifescalingperlevel_Item {
      Level?: number;
      MoreLife?: number;
    }
    export interface data_betrayalwalllifescalingperlevel extends Array<data_betrayalwalllifescalingperlevel_Item> {}
    
    export type data_beyondfactions = any[];
    
    interface data_bindablevirtualkeys_Item {
      KeyCode?: number;
      Name?: string;
      Id?: string;
    }
    export interface data_bindablevirtualkeys extends Array<data_bindablevirtualkeys_Item> {}
    
    interface data_blightbalanceperlevel_Item {
      Level?: number;
      Unk001?: number;
      Unk002?: number[];
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
    }
    export interface data_blightbalanceperlevel extends Array<data_blightbalanceperlevel_Item> {}
    
    interface data_blightbosslifescalingperlevel_Item {
      Level?: number;
      MoreLife?: number;
    }
    export interface data_blightbosslifescalingperlevel extends Array<data_blightbosslifescalingperlevel_Item> {}
    
    interface data_blightchesttypes_Item {
      ChestsKey?: data_blightchesttypes_Item_ChestsKey;
    }
    interface data_blightchesttypes_Item_ChestsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_blightchesttypes extends Array<data_blightchesttypes_Item> {}
    
    interface data_blightcraftingitems_Item {
      Oil?: data_blightcraftingitems_Item_Oil;
      Tier?: number;
      Achievements?: any[];
      UseType?: number;
      NameShort?: string;
    }
    interface data_blightcraftingitems_Item_Oil {
      TableName?: string;
      Id?: string;
    }
    export interface data_blightcraftingitems extends Array<data_blightcraftingitems_Item> {}
    
    export type data_blightcraftingrecipes = any[];
    
    interface data_blightcraftingresults_Item {
      Id?: string;
      ModsKey?: any;
      PassiveSkillsKey?: data_blightcraftingresults_Item_PassiveSkillsKey;
    }
    interface data_blightcraftingresults_Item_PassiveSkillsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_blightcraftingresults extends Array<data_blightcraftingresults_Item> {}
    
    interface data_blightcraftingtypes_Item {
      Id?: string;
      Unk001?: number;
      Unk002?: boolean;
    }
    export interface data_blightcraftingtypes extends Array<data_blightcraftingtypes_Item> {}
    
    interface data_blightcraftinguniques_Item {
      WordsKey?: data_blightcraftinguniques_Item_WordsKey;
    }
    interface data_blightcraftinguniques_Item_WordsKey {
      TableName?: string;
      Text?: string;
    }
    export interface data_blightcraftinguniques extends Array<data_blightcraftinguniques_Item> {}
    
    interface data_blightedsporeauras_Item {
      BuffDefinitionsKey?: data_blightedsporeauras_Item_BuffDefinitionsKey;
      BuffStatValues?: number[];
      Unk002?: number;
      Unk003?: number[];
      Unk004?: number;
    }
    interface data_blightedsporeauras_Item_BuffDefinitionsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_blightedsporeauras extends Array<data_blightedsporeauras_Item> {}
    
    interface data_blightencountertypes_Item {
      Id?: string;
      Icon?: string;
      IsGeneric?: boolean;
      Weight?: number;
    }
    export interface data_blightencountertypes extends Array<data_blightencountertypes_Item> {}
    
    interface data_blightencounterwaves_Item {
      MonsterSpawnerId?: string;
      EncounterType?: data_blightencounterwaves_Item_EncounterType;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Wave?: number;
    }
    interface data_blightencounterwaves_Item_EncounterType {
      TableName?: string;
      Id?: string;
    }
    export interface data_blightencounterwaves extends Array<data_blightencounterwaves_Item> {}
    
    interface data_blightrewardtypes_Item {
      Id?: string;
      Icon?: string;
    }
    export interface data_blightrewardtypes extends Array<data_blightrewardtypes_Item> {}
    
    interface data_blightstashtablayout_Item {
      Id?: string;
      StoredItem?: any;
      XOffset?: number;
      YOffset?: number;
      FirstSlotIndex?: number;
      Width?: number;
      Height?: number;
      SlotSize?: number;
      Unk008?: boolean;
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: boolean;
    }
    export interface data_blightstashtablayout extends Array<data_blightstashtablayout_Item> {}
    
    interface data_blighttopologies_Item {
      Id?: string;
      BlightTopologyNodesKey?: data_blighttopologies_Item_BlightTopologyNodesKey;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
    }
    interface data_blighttopologies_Item_BlightTopologyNodesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_blighttopologies extends Array<data_blighttopologies_Item> {}
    
    interface data_blighttopologynodes_Item {
      Id?: string;
      Unk001?: any[];
      Size?: number;
      Angle?: number;
      Unk004?: number[];
      Unk005?: number[];
      Unk006?: number[];
      Unk007?: number[];
      Unk008?: number[];
      Unk009?: number[];
      Unk010?: number;
    }
    export interface data_blighttopologynodes extends Array<data_blighttopologynodes_Item> {}
    
    interface data_blighttowerauras_Item {
      Id?: number;
      BuffDefinitionsKey?: data_blighttowerauras_Item_BuffDefinitionsKey;
      Unk002?: number;
      MiscAnimatedKey?: data_blighttowerauras_Item_MiscAnimatedKey;
    }
    interface data_blighttowerauras_Item_BuffDefinitionsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_blighttowerauras_Item_MiscAnimatedKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_blighttowerauras extends Array<data_blighttowerauras_Item> {}
    
    interface data_blighttowers_Item {
      Id?: string;
      Name?: string;
      Description?: string;
      Icon?: string;
      NextUpgradeOptions?: any[];
      Unk005?: number;
      Tier?: string;
      Radius?: number;
      Unk008?: number;
      SpendResourceAchievement?: any;
      StatsKey?: any;
      StatsKeys?: any[];
      StatsKeys2?: any[];
      Unk013?: boolean;
    }
    export interface data_blighttowers extends Array<data_blighttowers_Item> {}
    
    interface data_blighttowersperlevel_Item {
      BlightTowersKey?: data_blighttowersperlevel_Item_BlightTowersKey;
      Unk001?: number;
      MonsterVarietiesKey?: any;
      Cost?: number;
      Unk004?: number;
    }
    interface data_blighttowersperlevel_Item_BlightTowersKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_blighttowersperlevel extends Array<data_blighttowersperlevel_Item> {}
    
    export type data_bloodhiteffects = any[];
    
    export type data_bloodtypes = any[];
    
    export type data_boltstatreference = any[];
    
    interface data_breachartvariations_Item {
      Id?: string;
      Unk001?: any;
      Unk002?: any;
      Unk003?: any;
      Unk004?: data_breachartvariations_Item_Unk004;
      Unk005?: data_breachartvariations_Item_Unk005;
      Unk006?: data_breachartvariations_Item_Unk006;
      Unk007?: any;
      Unk008?: number[];
      Unk009?: data_breachartvariations_Item_Unk009;
    }
    interface data_breachartvariations_Item_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_breachartvariations_Item_Unk005 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_breachartvariations_Item_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_breachartvariations_Item_Unk009 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_breachartvariations extends Array<data_breachartvariations_Item> {}
    
    interface data_breachbosslifescalingperlevel_Item {
      MonsterLevel?: number;
      LifeMultiplier?: number;
    }
    export interface data_breachbosslifescalingperlevel extends Array<data_breachbosslifescalingperlevel_Item> {}
    
    interface data_breachelement_Item {
      Element?: string;
      Unk001?: data_breachelement_Item_Unk001;
      BaseBreachstone?: data_breachelement_Item_BaseBreachstone;
      BossMapMod?: data_breachelement_Item_BossMapMod;
      DuplicateBoss?: data_breachelement_Item_DuplicateBoss;
    }
    interface data_breachelement_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_breachelement_Item_BaseBreachstone {
      TableName?: string;
      Id?: string;
    }
    interface data_breachelement_Item_BossMapMod {
      TableName?: string;
      Id?: string;
    }
    interface data_breachelement_Item_DuplicateBoss {
      TableName?: string;
      Id?: string;
    }
    export interface data_breachelement extends Array<data_breachelement_Item> {}
    
    export type data_breachstones = any[];
    
    interface data_buffdefinitions_Item {
      Id?: string;
      Description?: string;
      Invisible?: boolean;
      Removable?: boolean;
      Name?: string;
      StatsKeys?: any[];
      Unk006?: boolean;
      Unk007?: number;
      Unk008?: boolean;
      Maximum_StatsKey?: any;
      Current_StatsKey?: any;
      Unk011?: boolean;
      Unk012?: number;
      BuffVisualsKey?: data_buffdefinitions_Item_BuffVisualsKey;
      Unk014?: boolean;
      Unk015?: boolean;
      BuffCategory?: number;
      Unk017?: boolean;
      Unk018?: boolean;
      Unk019?: boolean;
      Unk020?: boolean;
      BuffLimit?: number;
      Unk022?: boolean;
      Id2?: string;
      IsRecovery?: boolean;
      Unk025?: boolean;
      Unk026?: any;
      Unk027?: boolean;
      Unk028?: number;
      Unk029?: boolean;
      Unk030?: boolean;
      Unk031?: number;
      Unk032?: any[];
      Unk033?: boolean;
      Unk034?: boolean;
      Unk035?: any[];
      Unk036?: boolean;
      Unk037?: any[];
      BinaryStats?: any[];
      Unk039?: any[];
      Unk040?: any[];
      Unk041?: boolean;
      Unk042?: boolean;
      Unk043?: boolean;
      Unk044?: boolean;
      Unk045?: boolean;
      Unk046?: any;
      Unk047?: any[];
      Unk048?: string;
      Unk049?: any[];
      Unk050?: boolean;
    }
    interface data_buffdefinitions_Item_BuffVisualsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_buffdefinitions extends Array<data_buffdefinitions_Item> {}
    
    interface data_bufftemplates_Item {
      Id?: string;
      BuffDefinitionsKey?: data_bufftemplates_Item_BuffDefinitionsKey;
      Buff_StatValues?: number[];
      AuraRadius?: number;
      Unk004?: any[];
      Unk005?: any[];
      BuffVisualsKey?: any;
      Unk007?: number;
      Unk008?: boolean;
      StatsKey?: any[];
      Unk010?: number;
      Unk011?: number;
      Unk012?: boolean;
      Unk013?: any;
    }
    interface data_bufftemplates_Item_BuffDefinitionsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_bufftemplates extends Array<data_bufftemplates_Item> {}
    
    export type data_buffvisualorbart = any[];
    
    interface data_buffvisualorbs_Item {
      Id?: string;
      BuffVisualOrbTypesKey?: data_buffvisualorbs_Item_BuffVisualOrbTypesKey;
      BuffVisualOrbArtKeys?: any[];
      Player_BuffVisualOrbArtKeys?: any[];
      BuffVisualOrbArtKeys2?: any[];
    }
    interface data_buffvisualorbs_Item_BuffVisualOrbTypesKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface data_buffvisualorbs extends Array<data_buffvisualorbs_Item> {}
    
    export type data_buffvisualorbtypes = any[];
    
    interface data_buffvisuals_Item {
      Id?: string;
      BuffDDSFile?: string;
      EPKFiles1?: string[];
      EPKFiles2?: string[];
      PreloadGroups?: any[];
      Unk005?: boolean;
      BuffName?: string;
      MiscAnimated1?: any;
      MiscAnimated2?: any;
      BuffDescription?: string;
      EPKFile?: string;
      HasExtraArt?: boolean;
      ExtraArt?: string;
      Unk013?: any[];
      EPKFiles?: any[];
      BuffVisualOrbs?: any[];
      MiscAnimated3?: any;
      Unk017?: any;
      Unk018?: any;
    }
    export interface data_buffvisuals extends Array<data_buffvisuals_Item> {}
    
    interface data_buffvisualsartvariations_Item {
      Buff?: string;
      Unk001?: number[];
      Unk002?: number;
    }
    export interface data_buffvisualsartvariations extends Array<data_buffvisualsartvariations_Item> {}
    
    interface data_buffvisualsetentries_Item {
      Id?: string;
      Unk001?: number;
      BuffVisual?: data_buffvisualsetentries_Item_BuffVisual;
      Unk003?: number;
    }
    interface data_buffvisualsetentries_Item_BuffVisual {
      TableName?: string;
      Id?: string;
    }
    export interface data_buffvisualsetentries extends Array<data_buffvisualsetentries_Item> {}
    
    export type data_buffvisualshapeshiftoverride = any[];
    
    export type data_caravanstops = any[];
    
    interface data_chanceableitemclasses_Item {
      ItemClass?: data_chanceableitemclasses_Item_ItemClass;
    }
    interface data_chanceableitemclasses_Item_ItemClass {
      TableName?: string;
      Id?: string;
    }
    export interface data_chanceableitemclasses extends Array<data_chanceableitemclasses_Item> {}
    
    interface data_characteraudioevents_Item {
      Id?: string;
      Event?: data_characteraudioevents_Item_Event;
      Unk002?: number;
      Unk003?: number;
      Goddess_CharacterTextAudioKeys?: any[];
      JackTheAxe_CharacterTextAudioKeys?: any[];
      Unk006?: boolean;
      Unk007?: boolean;
    }
    interface data_characteraudioevents_Item_Event {
      TableName?: string;
      Id?: string;
    }
    export interface data_characteraudioevents extends Array<data_characteraudioevents_Item> {}
    
    export type data_charactercreationbutton = any[];
    
    interface data_charactercreationdialogue_Item {
      Character?: data_charactercreationdialogue_Item_Character;
      IntroDialogue?: data_charactercreationdialogue_Item_IntroDialogue;
      Unk03?: any;
      EscapeDialogue?: data_charactercreationdialogue_Item_EscapeDialogue;
    }
    interface data_charactercreationdialogue_Item_Character {
      TableName?: string;
      Id?: string;
    }
    interface data_charactercreationdialogue_Item_IntroDialogue {
      TableName?: string;
      Id?: string;
    }
    interface data_charactercreationdialogue_Item_EscapeDialogue {
      TableName?: string;
      Id?: string;
    }
    export interface data_charactercreationdialogue extends Array<data_charactercreationdialogue_Item> {}
    
    interface data_charactercreationicons_Item {
      Id?: string;
      Type?: string;
      Description?: string;
      Video?: string;
      Icon?: string;
    }
    export interface data_charactercreationicons extends Array<data_charactercreationicons_Item> {}
    
    export type data_charactermeleeskills = any[];
    
    interface data_characterpaneldescriptionmodes_Item {
      Id?: string;
      Unk001?: string;
      FormatString_Positive?: string;
      FormatString_Negative?: string;
    }
    export interface data_characterpaneldescriptionmodes extends Array<data_characterpaneldescriptionmodes_Item> {}
    
    interface data_characterpanelstats_Item {
      Id?: string;
      Text?: string;
      StatsKeys1?: any[];
      CharacterPanelDescriptionModesKey?: data_characterpanelstats_Item_CharacterPanelDescriptionModesKey;
      StatsKeys2?: any[];
      StatsKeys3?: any[];
      CharacterPanelTabsKey?: data_characterpanelstats_Item_CharacterPanelTabsKey;
      Unk007?: boolean;
      Unk008?: any[];
      Unk009?: number;
    }
    interface data_characterpanelstats_Item_CharacterPanelDescriptionModesKey {
      TableName?: string;
      Id?: string;
    }
    interface data_characterpanelstats_Item_CharacterPanelTabsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_characterpanelstats extends Array<data_characterpanelstats_Item> {}
    
    interface data_characterpaneltabs_Item {
      Id?: string;
      Unk001?: number;
      Text?: string;
      Unk003?: number;
    }
    export interface data_characterpaneltabs extends Array<data_characterpaneltabs_Item> {}
    
    interface data_characters_Item {
      Id?: string;
      Name?: string;
      AOFile?: string;
      ACTFile?: string;
      BaseMaxLife?: number;
      BaseMaxMana?: number;
      WeaponSpeed?: number;
      MinDamage?: number;
      MaxDamage?: number;
      MaxAttackDistance?: number;
      Icon?: string;
      IntegerId?: number;
      BaseStrength?: number;
      BaseDexterity?: number;
      BaseIntelligence?: number;
      Unk015?: any[];
      Description?: string;
      StartSkillGem?: data_characters_Item_StartSkillGem;
      Unk019?: number;
      Unk20?: number;
      Unk21?: number;
      IntroSoundFile?: string;
      StartWeapons?: any[];
      Gender?: string;
      TraitDescription?: string;
      Unk027?: any;
      Unk028?: any;
      Unk029?: number;
      PassiveTreeImage?: string;
      Unk030?: data_characters_Item_Unk030;
      Unk031?: data_characters_Item_Unk031;
      Unk033?: number;
      PassiveTreeImageAgain?: string;
      TencentVideo?: string;
      AttrsAsId?: string;
      LoginScreen?: string;
      PlayerCritter?: string;
      PlayerEffect?: string;
      AfterImage?: string;
      Mirage?: data_characters_Item_Mirage;
      CloneImmobile?: data_characters_Item_CloneImmobile;
      ReplicateClone?: data_characters_Item_ReplicateClone;
      LightningClone?: data_characters_Item_LightningClone;
      Unk045?: number;
      Unk046?: number;
      SkillTreeBackground?: string;
      Clone?: data_characters_Item_Clone;
      Double?: data_characters_Item_Double;
      MirageWarrior?: data_characters_Item_MirageWarrior;
      DoubleTwo?: data_characters_Item_DoubleTwo;
      DarkExile?: data_characters_Item_DarkExile;
      Attr?: string;
      AttrLowercase?: string;
      Script?: string;
      Unk056?: data_characters_Item_Unk056;
      Unk057?: number;
      Unk058?: number;
      Unk059?: number;
      Unk060?: number;
      Unk061?: number;
      Unk062?: number;
      Unk063?: data_characters_Item_Unk063;
      Unk064?: number;
      Unk065?: number;
      Unk066?: number;
      Unk067?: number;
    }
    interface data_characters_Item_StartSkillGem {
      TableName?: string;
      RowIndex?: number;
    }
    interface data_characters_Item_Unk030 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_characters_Item_Unk031 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_characters_Item_Mirage {
      TableName?: string;
      Id?: string;
    }
    interface data_characters_Item_CloneImmobile {
      TableName?: string;
      Id?: string;
    }
    interface data_characters_Item_ReplicateClone {
      TableName?: string;
      Id?: string;
    }
    interface data_characters_Item_LightningClone {
      TableName?: string;
      Id?: string;
    }
    interface data_characters_Item_Clone {
      TableName?: string;
      Id?: string;
    }
    interface data_characters_Item_Double {
      TableName?: string;
      Id?: string;
    }
    interface data_characters_Item_MirageWarrior {
      TableName?: string;
      Id?: string;
    }
    interface data_characters_Item_DoubleTwo {
      TableName?: string;
      Id?: string;
    }
    interface data_characters_Item_DarkExile {
      TableName?: string;
      Id?: string;
    }
    interface data_characters_Item_Unk056 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_characters_Item_Unk063 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_characters extends Array<data_characters_Item> {}
    
    interface data_characterstartqueststate_Item {
      Id?: string;
      QuestKeys?: any[];
      QuestStates?: any[];
      Unk003?: any[];
      MapPinsKeys?: any[];
      Unk005?: any[];
      Unk006?: any[];
    }
    export interface data_characterstartqueststate extends Array<data_characterstartqueststate_Item> {}
    
    interface data_characterstartstates_Item {
      Id?: string;
      Description?: string;
      CharactersKey?: data_characterstartstates_Item_CharactersKey;
      Level?: number;
      PassiveSkillsKeys?: any[];
      CharacterStartStateSetKey?: data_characterstartstates_Item_CharacterStartStateSetKey;
      Unk006?: data_characterstartstates_Item_Unk006;
      CharacterStartQuestStateKeys?: any[];
      Unk008?: boolean;
      InfoText?: string;
      Unk010?: any;
    }
    interface data_characterstartstates_Item_CharactersKey {
      TableName?: string;
      Id?: string;
    }
    interface data_characterstartstates_Item_CharacterStartStateSetKey {
      TableName?: string;
      Id?: string;
    }
    interface data_characterstartstates_Item_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_characterstartstates extends Array<data_characterstartstates_Item> {}
    
    interface data_characterstartstateset_Item {
      Id?: string;
    }
    export interface data_characterstartstateset extends Array<data_characterstartstateset_Item> {}
    
    export type data_charactervariationgroups = any[];
    
    export type data_chargevariations = any[];
    
    interface data_chaticons_Item {
      Icon?: string;
      Image?: string;
    }
    export interface data_chaticons extends Array<data_chaticons_Item> {}
    
    interface data_chestclusters_Item {
      Id?: string;
      ChestsKeys?: any[];
      Unk002?: number[];
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
    }
    export interface data_chestclusters extends Array<data_chestclusters_Item> {}
    
    interface data_chesteffects_Item {
      Id?: string;
      Normal_EPKFile?: string;
      Normal_Closed_AOFile?: string;
      Normal_Open_AOFile?: string;
      Magic_EPKFile?: string;
      Unique_EPKFile?: string;
      Rare_EPKFile?: string;
      Magic_Closed_AOFile?: string;
      Unique_Closed_AOFile?: string;
      Rare_Closed_AOFile?: string;
      Magic_Open_AOFile?: string;
      Unique_Open_AOFile?: string;
      Rare_Open_AOFile?: string;
    }
    export interface data_chesteffects extends Array<data_chesteffects_Item> {}
    
    interface data_chests_Item {
      Id?: string;
      Unk001?: boolean;
      Unk002?: number;
      Name?: string;
      AOFiles?: string[];
      Unk005?: boolean;
      Unk006?: boolean;
      Unk007?: number;
      Unk008?: boolean;
      Unk009?: boolean;
      Unk010?: number;
      Unk011?: any[];
      BaseItemTypesKey?: any;
      Unk013?: boolean;
      ModsKeys?: any[];
      TagsKeys?: any[];
      ChestEffectsKey?: data_chests_Item_ChestEffectsKey;
      MinLevel?: number;
      Unk018?: any;
      MaxLevel?: number;
      Corrupt_AchievementItemsKey?: any;
      CurrencyUse_AchievementItemsKey?: any;
      Encounter_AchievementItemsKeys?: any[];
      Unk023?: any;
      InheritsFrom?: any;
      Unk025?: boolean;
      Unk026?: any;
      Unk027?: any[];
      Unk028?: string;
      Unk029?: number;
      Unk030?: number;
      Unk031?: boolean;
      Unk032?: any;
      Unk033?: any;
      Unk034?: boolean;
      Unk035?: boolean;
      Unk036?: any[];
      IsHardmode?: boolean;
      StatsHardmode?: any[];
      Unk039?: boolean;
    }
    interface data_chests_Item_ChestEffectsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_chests extends Array<data_chests_Item> {}
    
    export type data_classpassiveskilloverrides = any[];
    
    interface data_clientleagueaction_Item {
      Id?: string;
      Unk001?: data_clientleagueaction_Item_Unk001;
      Unk002?: number;
      GamepadIcon?: string;
    }
    interface data_clientleagueaction_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_clientleagueaction extends Array<data_clientleagueaction_Item> {}
    
    interface data_clientstrings_Item {
      Id?: string;
      Text?: string;
      XBoxText?: string;
      XBoxText2?: string;
      HASH32?: number;
      PlaystationText?: string;
    }
    export interface data_clientstrings extends Array<data_clientstrings_Item> {}
    
    export type data_clientstrings2 = any[];
    
    interface data_cloneshot_Item {
      Id?: number;
      MonsterVarietiesKey?: any;
      MiscAnimated1?: any;
      MiscAnimated2?: any;
      MiscAnimated3?: any;
    }
    export interface data_cloneshot extends Array<data_cloneshot_Item> {}
    
    interface data_colours_Item {
      Item?: string;
      Red?: number;
      Green?: number;
      Blue?: number;
      RgbCode?: string;
    }
    export interface data_colours extends Array<data_colours_Item> {}
    
    export type data_combatuiprompts = any[];
    
    interface data_commands_Item {
      Id?: string;
      Command?: string;
      Unk002?: boolean;
      EnglishCommand?: string;
      Description?: string;
      Unk005?: boolean;
    }
    export interface data_commands extends Array<data_commands_Item> {}
    
    export type data_completionnotifications = any[];
    
    interface data_componentcharges_Item {
      BaseItemTypesKey?: string;
      MaxCharges?: number;
      PerCharge?: number;
      MaxCharges2?: number;
      PerCharge2?: number;
    }
    export interface data_componentcharges extends Array<data_componentcharges_Item> {}
    
    interface data_conditionalachievements_Item {
      Unk000?: data_conditionalachievements_Item_Unk000;
      Unk001?: number;
      Unk002?: number;
    }
    interface data_conditionalachievements_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_conditionalachievements extends Array<data_conditionalachievements_Item> {}
    
    interface data_coreleagues_Item {
      Id?: string;
      Unk001?: boolean;
      Unk002?: boolean;
      Unk003?: data_coreleagues_Item_Unk003;
      Unk004?: any[];
      Unk005?: data_coreleagues_Item_Unk005;
      Unk006?: data_coreleagues_Item_Unk006;
      Unk007?: any;
      Unk008?: any[];
      Unk009?: data_coreleagues_Item_Unk009;
      Unk010?: any;
      Unk011?: number;
      Unk012?: boolean;
      Unk013?: any;
      Unk014?: boolean;
      Unk015?: boolean;
      Unk016?: any[];
    }
    interface data_coreleagues_Item_Unk003 {
      TableName?: string;
      Id?: string;
    }
    interface data_coreleagues_Item_Unk005 {
      TableName?: string;
      Id?: string;
    }
    interface data_coreleagues_Item_Unk006 {
      TableName?: string;
      Id?: string;
    }
    interface data_coreleagues_Item_Unk009 {
      TableName?: string;
      Id?: string;
    }
    export interface data_coreleagues extends Array<data_coreleagues_Item> {}
    
    export type data_corpseexplosiongibs = any[];
    
    interface data_corpsesinkvariations_Item {
      Id?: string;
      AOFile?: string;
      EPKFile?: string;
      AOFiles?: any[];
      Unk004?: number;
      Unk005?: boolean;
      Unk006?: number;
      Unk007?: number;
      Unk008?: boolean;
    }
    export interface data_corpsesinkvariations extends Array<data_corpsesinkvariations_Item> {}
    
    interface data_cosmeticsequippanelmode_Item {
      Id?: string;
      Unk001?: number[];
    }
    export interface data_cosmeticsequippanelmode extends Array<data_cosmeticsequippanelmode_Item> {}
    
    interface data_costtypes_Item {
      Id?: string;
      StatsKey?: data_costtypes_Item_StatsKey;
      FormatText?: string;
      Unk003?: number;
    }
    interface data_costtypes_Item_StatsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_costtypes extends Array<data_costtypes_Item> {}
    
    export type data_craftablemodtypes = any[];
    
    export type data_craftingbenchoptions = any[];
    
    export type data_craftingbenchsortcategories = any[];
    
    interface data_craftingbenchspecificoptionid_Item {
      Unk000?: string;
      Unk001?: data_craftingbenchspecificoptionid_Item_Unk001;
    }
    interface data_craftingbenchspecificoptionid_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_craftingbenchspecificoptionid extends Array<data_craftingbenchspecificoptionid_Item> {}
    
    interface data_craftingbenchunlockcategories_Item {
      Id?: string;
      Unk001?: number;
      Unk002?: number[];
      UnlockType?: string;
      CraftingItemClassCategories?: any[];
      ObtainingDescription?: string;
    }
    export interface data_craftingbenchunlockcategories extends Array<data_craftingbenchunlockcategories_Item> {}
    
    export type data_craftingitemclasscategories = any[];
    
    export type data_crossbowskillboltoverride = any[];
    
    interface data_currencyexchange_Item {
      Item?: data_currencyexchange_Item_Item;
      Category?: data_currencyexchange_Item_Category;
      SubCategory?: data_currencyexchange_Item_SubCategory;
      Unk003?: boolean;
      EnabledInChallengeLeague?: boolean;
      GoldPurchaseFee?: number;
      Unk006?: boolean;
    }
    interface data_currencyexchange_Item_Item {
      TableName?: string;
      Id?: string;
    }
    interface data_currencyexchange_Item_Category {
      TableName?: string;
      Id?: string;
    }
    interface data_currencyexchange_Item_SubCategory {
      TableName?: string;
      Id?: string;
    }
    export interface data_currencyexchange extends Array<data_currencyexchange_Item> {}
    
    interface data_currencyexchangecategories_Item {
      Id?: string;
      Name?: string;
    }
    export interface data_currencyexchangecategories extends Array<data_currencyexchangecategories_Item> {}
    
    interface data_currencyitems_Item {
      BaseItemTypesKey?: data_currencyitems_Item_BaseItemTypesKey;
      StackSize?: number;
      CurrencyUseType?: number;
      Action?: string;
      Directions?: string;
      FullStack_BaseItemTypesKey?: any;
      Description?: string;
      Usage_AchievementItemsKeys?: any[];
      Scroll?: boolean;
      Possession_AchievementItemsKey?: data_currencyitems_Item_Possession_AchievementItemsKey;
      Unk010?: any[];
      Unk011?: any[];
      CurrencyTab_StackSize?: number;
      XBoxDirections?: string;
      Unk014?: number;
      ModifyMapsAchievements?: any[];
      ModifyContractsAchievements?: any[];
      CombineAchievements?: any[];
      ChangedForHardmode?: boolean;
      DescriptionHardmode?: string;
      IsGold?: boolean;
      Unk021?: boolean;
    }
    interface data_currencyitems_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    interface data_currencyitems_Item_Possession_AchievementItemsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_currencyitems extends Array<data_currencyitems_Item> {}
    
    interface data_currencystashtablayout_Item {
      Id?: string;
      StoredItem?: data_currencystashtablayout_Item_StoredItem;
      XOffset?: number;
      YOffset?: number;
      FirstSlotIndex?: number;
      Width?: number;
      Height?: number;
      ShowIfEmpty?: boolean;
      SlotGroup?: number;
    }
    interface data_currencystashtablayout_Item_StoredItem {
      TableName?: string;
      Id?: string;
    }
    export interface data_currencystashtablayout extends Array<data_currencystashtablayout_Item> {}
    
    interface data_currencyuseeffects_Item {
      Unk000?: data_currencyuseeffects_Item_Unk000;
      Unk001?: number;
      BK2File?: string;
      SoundFile?: string;
      Unk004?: boolean;
      BK2File2?: string;
      Unk006?: boolean;
      Unk007?: any;
      Unk008?: number;
    }
    interface data_currencyuseeffects_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_currencyuseeffects extends Array<data_currencyuseeffects_Item> {}
    
    export type data_customleaguemonsterreplacements = any[];
    
    export type data_customleagueroomreplacements = any[];
    
    interface data_daemonspawningdata_Item {
      Id?: string;
      MonsterVarieties?: any[];
      Unk002?: number;
      Unk003?: boolean;
      Unk004?: number;
      Unk005?: number;
      Unk006?: boolean;
      Unk007?: boolean;
      Unk008?: boolean;
    }
    export interface data_daemonspawningdata extends Array<data_daemonspawningdata_Item> {}
    
    export type data_damagecalculationtypes = any[];
    
    interface data_damageeffectvariations_Item {
      Id?: string;
      Unk001?: number[];
      Unk002?: any[];
      Unk003?: boolean;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: boolean;
      Unk014?: boolean;
      Unk015?: boolean;
      Unk016?: any;
    }
    export interface data_damageeffectvariations extends Array<data_damageeffectvariations_Item> {}
    
    interface data_damagehiteffects_Item {
      Id?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number[];
      Unk004?: any[];
    }
    export interface data_damagehiteffects extends Array<data_damagehiteffects_Item> {}
    
    export type data_damageparticleeffects = any[];
    
    interface data_damagewhenhiteffects_Item {
      Unk000?: data_damagewhenhiteffects_Item_Unk000;
      Unk001?: data_damagewhenhiteffects_Item_Unk001;
      Unk002?: boolean;
    }
    interface data_damagewhenhiteffects_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_damagewhenhiteffects_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_damagewhenhiteffects extends Array<data_damagewhenhiteffects_Item> {}
    
    export type data_dances = any[];
    
    export type data_daressopitfights = any[];
    
    interface data_defaultmonsterstats_Item {
      DisplayLevel?: string;
      Damage?: number;
      Evasion?: number;
      Accuracy?: number;
      Life?: number;
      Experience?: number;
      AllyLife?: number;
      Unk007?: number;
      Difficulty?: number;
      Damage2?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Armour?: number;
    }
    export interface data_defaultmonsterstats extends Array<data_defaultmonsterstats_Item> {}
    
    interface data_deliriumstashtablayout_Item {
      Id?: string;
      StoredItem?: data_deliriumstashtablayout_Item_StoredItem;
      XOffset?: number;
      YOffset?: number;
      FirstSlotIndex?: number;
      Width?: number;
      Height?: number;
      SlotSize?: number;
      Unk008?: boolean;
    }
    interface data_deliriumstashtablayout_Item_StoredItem {
      TableName?: string;
      Id?: string;
    }
    export interface data_deliriumstashtablayout extends Array<data_deliriumstashtablayout_Item> {}
    
    interface data_delveazuriteshop_Item {
      BaseItemTypesKey?: data_delveazuriteshop_Item_BaseItemTypesKey;
      SpawnWeight?: number;
      Cost?: number;
      MinDepth?: number;
      IsResonator?: boolean;
      Unk005?: number;
      Unk006?: number;
    }
    interface data_delveazuriteshop_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_delveazuriteshop extends Array<data_delveazuriteshop_Item> {}
    
    export type data_delvebiomes = any[];
    
    interface data_delvecatchupdepths_Item {
      Level?: number;
      Depth?: number;
    }
    export interface data_delvecatchupdepths extends Array<data_delvecatchupdepths_Item> {}
    
    interface data_delvecraftingmodifierdescriptions_Item {
      Id?: string;
      Description?: string;
    }
    export interface data_delvecraftingmodifierdescriptions extends Array<data_delvecraftingmodifierdescriptions_Item> {}
    
    interface data_delvecraftingmodifiers_Item {
      BaseItemTypesKey?: data_delvecraftingmodifiers_Item_BaseItemTypesKey;
      AddedModsKeys?: any[];
      NegativeWeight_TagsKeys?: any[];
      NegativeWeight_Values?: number[];
      ForcedAddModsKeys?: any[];
      ForbiddenDelveCraftingTagsKeys?: any[];
      AllowedDelveCraftingTagsKeys?: any[];
      CanMirrorItem?: boolean;
      CorruptedEssenceChance?: number;
      CanImproveQuality?: boolean;
      HasLuckyRolls?: boolean;
      SellPrice_ModsKeys?: any[];
      CanRollWhiteSockets?: boolean;
      Weight_TagsKeys?: any[];
      Weight_Values?: number[];
      DelveCraftingModifierDescriptionsKeys?: any[];
      BlockedDelveCraftingModifierDescriptionsKeys?: any[];
      Unk017?: boolean;
      Unk018?: boolean;
      Unk019?: number[];
      Unk020?: number[];
    }
    interface data_delvecraftingmodifiers_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_delvecraftingmodifiers extends Array<data_delvecraftingmodifiers_Item> {}
    
    interface data_delvecraftingtags_Item {
      TagsKey?: data_delvecraftingtags_Item_TagsKey;
      ItemClass?: string;
    }
    interface data_delvecraftingtags_Item_TagsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_delvecraftingtags extends Array<data_delvecraftingtags_Item> {}
    
    interface data_delvedynamite_Item {
      Unk000?: number;
      ProjectilesKey?: data_delvedynamite_Item_ProjectilesKey;
      Unk002?: any;
      Dynamite_MiscObjectsKey?: any;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      MiscAnimatedKey?: data_delvedynamite_Item_MiscAnimatedKey;
      Unk012?: number;
    }
    interface data_delvedynamite_Item_ProjectilesKey {
      TableName?: string;
      Id?: string;
    }
    interface data_delvedynamite_Item_MiscAnimatedKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_delvedynamite extends Array<data_delvedynamite_Item> {}
    
    interface data_delvefeatures_Item {
      Id?: string;
      Name?: string;
      SpawnWeight?: number[];
      WorldAreasKey?: any;
      Image?: string;
      AchievementItemsKeys?: any[];
      Unk006?: any[];
      MinDepth?: any[];
      Description?: string;
      Unk009?: number;
      Unk010?: any[];
      Unk011?: number[];
      Unk012?: any[];
      Unk013?: number[];
    }
    export interface data_delvefeatures extends Array<data_delvefeatures_Item> {}
    
    interface data_delveflares_Item {
      Unk000?: number;
      Unk001?: data_delveflares_Item_Unk001;
      Unk002?: any;
      Unk003?: number;
      Unk004?: any;
      Unk005?: number;
      Unk006?: number;
    }
    interface data_delveflares_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_delveflares extends Array<data_delveflares_Item> {}
    
    interface data_delvelevelscaling_Item {
      Depth?: number;
      MonsterLevel?: number;
      Unk002?: number;
      SulphiteCost?: number;
      MonsterLevel2?: number;
      MoreMonsterDamage?: number;
      MoreMonsterLife?: number;
      DarknessResistance?: number;
      LightRadius?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
    }
    export interface data_delvelevelscaling extends Array<data_delvelevelscaling_Item> {}
    
    export type data_delvemonsterspawners = any[];
    
    interface data_delveresourceperlevel_Item {
      AreaLevel?: number;
      Sulphite?: number;
    }
    export interface data_delveresourceperlevel extends Array<data_delveresourceperlevel_Item> {}
    
    interface data_delverewardtierconstants_Item {
      Unk000?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
    }
    export interface data_delverewardtierconstants extends Array<data_delverewardtierconstants_Item> {}
    
    interface data_delverobotvariations_Item {
      Id?: string;
      AOFile?: string;
      Unk002?: string[];
      Unk003?: any;
      Unk004?: data_delverobotvariations_Item_Unk004;
    }
    interface data_delverobotvariations_Item_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_delverobotvariations extends Array<data_delverobotvariations_Item> {}
    
    export type data_delverooms = any[];
    
    interface data_delvestashtablayout_Item {
      Id?: string;
      StoredItem?: data_delvestashtablayout_Item_StoredItem;
      XOffset?: number;
      YOffset?: number;
      FirstSlotIndex?: number;
      Width?: number;
      Height?: number;
      SlotSize?: number;
      HideIfEmpty?: boolean;
      Image?: string;
    }
    interface data_delvestashtablayout_Item_StoredItem {
      TableName?: string;
      Id?: string;
    }
    export interface data_delvestashtablayout extends Array<data_delvestashtablayout_Item> {}
    
    interface data_delveupgrades_Item {
      DelveUpgradeTypeKey?: number;
      UpgradeLevel?: number;
      StatsKeys?: any[];
      StatValues?: any[];
      Cost?: number;
      Unk005?: number;
      AchievementItemsKey?: any;
      Unk007?: number;
    }
    export interface data_delveupgrades extends Array<data_delveupgrades_Item> {}
    
    export type data_destructivedamageeffects = any[];
    
    interface data_dialogueevent_Item {
      Id?: string;
      Timer?: number;
    }
    export interface data_dialogueevent extends Array<data_dialogueevent_Item> {}
    
    export type data_displayminionmonstertype = any[];
    
    export type data_divinationcardart = any[];
    
    export type data_divinationcardstashtablayout = any[];
    
    interface data_doors_Item {
      Id?: string;
      Unk001?: boolean;
    }
    export interface data_doors extends Array<data_doors_Item> {}
    
    export type data_dronebasetypes = any[];
    
    interface data_dronetypes_Item {
      Id?: string;
      Unk001?: data_dronetypes_Item_Unk001;
      Unk002?: data_dronetypes_Item_Unk002;
      DeployText?: string;
      Unk004?: string;
      UnlockedStat?: data_dronetypes_Item_UnlockedStat;
      SocketableText?: string;
      NotPoweredText?: string;
    }
    interface data_dronetypes_Item_Unk001 {
      TableName?: string;
      Id?: string;
    }
    interface data_dronetypes_Item_Unk002 {
      TableName?: string;
      Id?: string;
    }
    interface data_dronetypes_Item_UnlockedStat {
      TableName?: string;
      Id?: string;
    }
    export interface data_dronetypes extends Array<data_dronetypes_Item> {}
    
    interface data_dropeffects_Item {
      Id?: string;
      AOFile?: string;
    }
    export interface data_dropeffects extends Array<data_dropeffects_Item> {}
    
    export type data_dynamicstashslots = any[];
    
    interface data_eclipsemods_Item {
      Key?: string;
      SpawnWeight_TagsKeys?: any[];
      SpawnWeight_Values?: number[];
      ModsKey?: data_eclipsemods_Item_ModsKey;
      MinLevel?: number;
      MaxLevel?: number;
      IsPrefix?: boolean;
    }
    interface data_eclipsemods_Item_ModsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_eclipsemods extends Array<data_eclipsemods_Item> {}
    
    interface data_effectdrivenskill_Item {
      Unk000?: number;
      Unk001?: any[];
      Unk002?: any[];
      Unk003?: number;
      Unk004?: number;
      Unk005?: boolean;
      Unk006?: boolean;
      Unk007?: boolean;
      Unk008?: any[];
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: boolean;
      Unk015?: number;
      Unk016?: boolean;
      Unk017?: boolean;
      Unk018?: number;
      Unk019?: number;
      Unk020?: boolean;
      Unk021?: boolean;
      Unk022?: boolean;
      Unk023?: number;
      Unk024?: boolean;
      Unk025?: boolean;
      Unk026?: number;
      Unk027?: number;
      Unk028?: number;
    }
    export interface data_effectdrivenskill extends Array<data_effectdrivenskill_Item> {}
    
    interface data_effectivenesscostconstants_Item {
      Id?: string;
      Multiplier?: number;
    }
    export interface data_effectivenesscostconstants extends Array<data_effectivenesscostconstants_Item> {}
    
    interface data_einharmissions_Item {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
    }
    export interface data_einharmissions extends Array<data_einharmissions_Item> {}
    
    interface data_einharpackfallback_Item {
      Unk000?: data_einharpackfallback_Item_Unk000;
      Unk001?: any[];
    }
    interface data_einharpackfallback_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_einharpackfallback extends Array<data_einharpackfallback_Item> {}
    
    export type data_elderbossarenas = any[];
    
    interface data_elderguardians_Item {
      Id?: string;
      MapIcon?: string;
    }
    export interface data_elderguardians extends Array<data_elderguardians_Item> {}
    
    export type data_eldermapbossoverride = any[];
    
    export type data_endgamecorruptionmods = any[];
    
    export type data_endgamemapbiomes = any[];
    
    export type data_endgamemapcompletionquests = any[];
    
    export type data_endgamemapcontent = any[];
    
    export type data_endgamemapcontentset = any[];
    
    export type data_endgamemapdecorations = any[];
    
    export type data_endgamemappins = any[];
    
    export type data_endgamemaps = any[];
    
    export type data_environmentfootprints = any[];
    
    interface data_environments_Item {
      Id?: string;
      Base_ENVFile?: string;
      Corrupted_ENVFiles?: any[];
      Unk003?: any[];
      Unk004?: any[];
      Unk005?: any[];
      EnvironmentTransitionsKey?: any;
      PreloadGroup?: any;
    }
    export interface data_environments extends Array<data_environments_Item> {}
    
    interface data_environmenttransitions_Item {
      Id?: string;
      OTFiles?: string[];
      Unk002?: string[];
    }
    export interface data_environmenttransitions extends Array<data_environmenttransitions_Item> {}
    
    export type data_essences = any[];
    
    interface data_essencestashtablayout_Item {
      Id?: string;
      StoredItem?: data_essencestashtablayout_Item_StoredItem;
      XOffset?: number;
      YOffset?: number;
      FirstSlotIndex?: number;
      Width?: number;
      Height?: number;
      IsUpgradableEssenceSlot?: boolean;
    }
    interface data_essencestashtablayout_Item_StoredItem {
      TableName?: string;
      Id?: string;
    }
    export interface data_essencestashtablayout extends Array<data_essencestashtablayout_Item> {}
    
    export type data_essencetype = any[];
    
    export type data_eventcoins = any[];
    
    interface data_evergreenachievements_Item {
      Unk000?: number;
      Unk001?: number;
      Unk002?: any[];
    }
    export interface data_evergreenachievements extends Array<data_evergreenachievements_Item> {}
    
    interface data_executegeal_Item {
      Unk000?: number;
      Unk001?: number;
      MiscAnimated?: any[];
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: boolean;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: boolean;
      Unk013?: any[];
      Unk014?: boolean;
      Unk015?: number;
      Unk016?: data_executegeal_Item_Unk016;
      Unk017?: boolean;
      Script?: string;
      Unk019?: boolean;
      Unk020?: number;
      Unk021?: boolean;
      Unk022?: number;
      Unk023?: number;
      Unk024?: boolean;
      Unk025?: number;
      MetadataIDs?: any[];
      ScriptCommand?: string;
      Unk028?: number[];
      Unk029?: number[];
      Unk030?: number;
      Unk031?: boolean;
      Unk032?: number[];
      Unk033?: boolean;
      Unk034?: number;
      Unk035?: boolean;
      Unk036?: number;
      Unk037?: boolean;
      Unk038?: number;
      Unk039?: number;
      Unk040?: number;
    }
    interface data_executegeal_Item_Unk016 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_executegeal extends Array<data_executegeal_Item> {}
    
    interface data_expandingpulse_Item {
      IntId?: number;
      StringId?: string;
      Unk002?: number[];
      Unk003?: number[];
      Unk004?: any[];
      Unk005?: number;
      Unk006?: number;
      Unk007?: boolean;
    }
    export interface data_expandingpulse extends Array<data_expandingpulse_Item> {}
    
    interface data_expeditionareas_Item {
      Area?: data_expeditionareas_Item_Area;
      PosX?: number;
      PosY?: number;
      Tags?: any[];
      Unk004?: number[];
      Unk005?: boolean;
      TextAudio?: data_expeditionareas_Item_TextAudio;
      CompletionAchievements?: any[];
    }
    interface data_expeditionareas_Item_Area {
      TableName?: string;
      Id?: string;
    }
    interface data_expeditionareas_Item_TextAudio {
      TableName?: string;
      Id?: string;
    }
    export interface data_expeditionareas extends Array<data_expeditionareas_Item> {}
    
    interface data_expeditionbalanceperlevel_Item {
      Level?: number;
      Unk001?: boolean;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
    }
    export interface data_expeditionbalanceperlevel extends Array<data_expeditionbalanceperlevel_Item> {}
    
    export type data_expeditioncurrency = any[];
    
    export type data_expeditiondeals = any[];
    
    export type data_expeditiondealsdialogue = any[];
    
    interface data_expeditionfactions_Item {
      Id?: string;
      Name?: string;
      FactionFlag?: string;
      Unk003?: number;
      FactionIcon?: string;
      MonsterVarieties?: data_expeditionfactions_Item_MonsterVarieties;
      Progress1?: data_expeditionfactions_Item_Progress1;
      Progress2Vaal?: data_expeditionfactions_Item_Progress2Vaal;
      Progress3Final?: data_expeditionfactions_Item_Progress3Final;
      Tags?: data_expeditionfactions_Item_Tags;
    }
    interface data_expeditionfactions_Item_MonsterVarieties {
      TableName?: string;
      Id?: string;
    }
    interface data_expeditionfactions_Item_Progress1 {
      TableName?: string;
      Id?: string;
    }
    interface data_expeditionfactions_Item_Progress2Vaal {
      TableName?: string;
      Id?: string;
    }
    interface data_expeditionfactions_Item_Progress3Final {
      TableName?: string;
      Id?: string;
    }
    interface data_expeditionfactions_Item_Tags {
      TableName?: string;
      Id?: string;
    }
    export interface data_expeditionfactions extends Array<data_expeditionfactions_Item> {}
    
    interface data_expeditionmarkerscommon_Item {
      Id?: string;
      AOFile?: string;
    }
    export interface data_expeditionmarkerscommon extends Array<data_expeditionmarkerscommon_Item> {}
    
    interface data_expeditionnpcs_Item {
      Id?: string;
      NPCs?: any[];
      RerollItem?: data_expeditionnpcs_Item_RerollItem;
      Unk003?: number;
      Unk004?: number;
      Unk005?: data_expeditionnpcs_Item_Unk005;
      Faction?: data_expeditionnpcs_Item_Faction;
      Reroll?: data_expeditionnpcs_Item_Reroll;
      AllBombsPlaced?: data_expeditionnpcs_Item_AllBombsPlaced;
      BombPlacedRemnant?: data_expeditionnpcs_Item_BombPlacedRemnant;
      BombPlacedTreasure?: data_expeditionnpcs_Item_BombPlacedTreasure;
      BombPlacedMonsters?: data_expeditionnpcs_Item_BombPlacedMonsters;
      BombPlacedGeneric?: data_expeditionnpcs_Item_BombPlacedGeneric;
      EncounterComplete?: data_expeditionnpcs_Item_EncounterComplete;
      Unk014?: number;
      Unk015?: number;
    }
    interface data_expeditionnpcs_Item_RerollItem {
      TableName?: string;
      Id?: string;
    }
    interface data_expeditionnpcs_Item_Unk005 {
      TableName?: string;
      Id?: string;
    }
    interface data_expeditionnpcs_Item_Faction {
      TableName?: string;
      Id?: string;
    }
    interface data_expeditionnpcs_Item_Reroll {
      TableName?: string;
      Id?: string;
    }
    interface data_expeditionnpcs_Item_AllBombsPlaced {
      TableName?: string;
      Id?: string;
    }
    interface data_expeditionnpcs_Item_BombPlacedRemnant {
      TableName?: string;
      Id?: string;
    }
    interface data_expeditionnpcs_Item_BombPlacedTreasure {
      TableName?: string;
      Id?: string;
    }
    interface data_expeditionnpcs_Item_BombPlacedMonsters {
      TableName?: string;
      Id?: string;
    }
    interface data_expeditionnpcs_Item_BombPlacedGeneric {
      TableName?: string;
      Id?: string;
    }
    interface data_expeditionnpcs_Item_EncounterComplete {
      TableName?: string;
      Id?: string;
    }
    export interface data_expeditionnpcs extends Array<data_expeditionnpcs_Item> {}
    
    interface data_expeditionrelicmods_Item {
      Mod?: data_expeditionrelicmods_Item_Mod;
      Categories?: number[];
      DestroyAchievements?: any[];
    }
    interface data_expeditionrelicmods_Item_Mod {
      TableName?: string;
      Id?: string;
    }
    export interface data_expeditionrelicmods extends Array<data_expeditionrelicmods_Item> {}
    
    interface data_expeditionrelics_Item {
      Id?: string;
      Name?: string;
      ItemTag?: data_expeditionrelics_Item_ItemTag;
      AOFile?: string;
      MinLevel?: number;
      MaxLevel?: number;
    }
    interface data_expeditionrelics_Item_ItemTag {
      TableName?: string;
      Id?: string;
    }
    export interface data_expeditionrelics extends Array<data_expeditionrelics_Item> {}
    
    interface data_expeditionterrainfeatures_Item {
      Id?: string;
      ExtraFeature?: data_expeditionterrainfeatures_Item_ExtraFeature;
      ExpeditionFaction?: any;
      MinLevel?: number;
      MaxLevel?: number;
      Unk005?: number;
      Area?: data_expeditionterrainfeatures_Item_Area;
      ExpeditionAreas?: any[];
      Unk008?: number;
      Unk009?: boolean;
      UnearthAchievements?: any[];
    }
    interface data_expeditionterrainfeatures_Item_ExtraFeature {
      TableName?: string;
      Id?: string;
    }
    interface data_expeditionterrainfeatures_Item_Area {
      TableName?: string;
      Id?: string;
    }
    export interface data_expeditionterrainfeatures extends Array<data_expeditionterrainfeatures_Item> {}
    
    interface data_experiencelevels_Item {
      Unk000?: string;
      Level?: number;
      Experience?: number;
    }
    export interface data_experiencelevels extends Array<data_experiencelevels_Item> {}
    
    export type data_explodingstormbuffs = any[];
    
    export type data_fixedhideoutdoodadtypes = any[];
    
    export type data_fixedmissions = any[];
    
    export type data_flasks = any[];
    
    export type data_flaskstashbasetypeordering = any[];
    
    interface data_footprints_Item {
      Id?: string;
      Active_AOFiles?: string[];
      Idle_AOFiles?: string[];
      Unk003?: any[];
      Unk004?: any[];
      Unk005?: number;
      Unk006?: any;
    }
    export interface data_footprints extends Array<data_footprints_Item> {}
    
    interface data_footstepaudio_Item {
      Id?: string;
      Index?: number;
    }
    export interface data_footstepaudio extends Array<data_footstepaudio_Item> {}
    
    interface data_fragmentstashtablayout_Item {
      Id?: string;
      XOffset?: number;
      YOffset?: number;
      FirstSlotIndex?: number;
      Width?: number;
      Height?: number;
      Unk006?: boolean;
      Tab?: number;
      SlotSize?: number;
      HideIfEmpty?: boolean;
      Subtab?: number;
      StoredItems?: any[];
      Unk012?: boolean;
      Unk013?: string;
      Unk014?: number;
    }
    export interface data_fragmentstashtablayout extends Array<data_fragmentstashtablayout_Item> {}
    
    export type data_gambleprices = any[];
    
    interface data_gameconstants_Item {
      Id?: string;
      Value?: number;
      Unk002?: number;
    }
    export interface data_gameconstants extends Array<data_gameconstants_Item> {}
    
    interface data_gamelogos_Item {
      Id?: string;
      LogoIntl?: string;
      LogoTW?: string;
    }
    export interface data_gamelogos extends Array<data_gamelogos_Item> {}
    
    interface data_gameobjecttasks_Item {
      Id?: string;
      HASH16?: number;
    }
    export interface data_gameobjecttasks extends Array<data_gameobjecttasks_Item> {}
    
    interface data_gameobjecttasksfromstats_Item {
      Unk000?: data_gameobjecttasksfromstats_Item_Unk000;
      Unk001?: data_gameobjecttasksfromstats_Item_Unk001;
      Unk002?: boolean;
      Unk003?: number;
      Unk004?: boolean;
      Unk005?: boolean;
      Unk006?: boolean;
    }
    interface data_gameobjecttasksfromstats_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_gameobjecttasksfromstats_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_gameobjecttasksfromstats extends Array<data_gameobjecttasksfromstats_Item> {}
    
    interface data_gamepadbutton_Item {
      Unk000?: string;
      Unk001?: string;
      Unk002?: string;
      Unk003?: string;
      Unk004?: string;
    }
    export interface data_gamepadbutton extends Array<data_gamepadbutton_Item> {}
    
    export type data_gamepadbuttonbindaction = any[];
    
    interface data_gamepadbuttoncombination_Item {
      Id?: string;
      Button1?: data_gamepadbuttoncombination_Item_Button1;
      Button2?: data_gamepadbuttoncombination_Item_Button2;
      Unk003?: number;
    }
    interface data_gamepadbuttoncombination_Item_Button1 {
      TableName?: string;
      RowIndex?: number;
    }
    interface data_gamepadbuttoncombination_Item_Button2 {
      TableName?: string;
      RowIndex?: number;
    }
    export interface data_gamepadbuttoncombination extends Array<data_gamepadbuttoncombination_Item> {}
    
    export type data_gamepaditemactiontypes = any[];
    
    interface data_gamepadthumbstick_Item {
      Unk000?: string;
      Unk001?: string;
    }
    export interface data_gamepadthumbstick extends Array<data_gamepadthumbstick_Item> {}
    
    interface data_gamepadtype_Item {
      Id?: string;
      Console?: string;
      ImageFile?: string;
    }
    export interface data_gamepadtype extends Array<data_gamepadtype_Item> {}
    
    interface data_gamestats_Item {
      Id?: string;
      Id2?: string;
    }
    export interface data_gamestats extends Array<data_gamestats_Item> {}
    
    interface data_gemeffects_Item {
      Id?: string;
      Name?: string;
      GrantedEffect?: data_gemeffects_Item_GrantedEffect;
      GrantedEffectHardmode?: data_gemeffects_Item_GrantedEffectHardmode;
      GrantedEffect2?: data_gemeffects_Item_GrantedEffect2;
      GrantedEffect2Hardmode?: any;
      SupportText?: string;
      SupportName?: any;
      GemTags?: any[];
      Consumed_ModsKey?: data_gemeffects_Item_Consumed_ModsKey;
      ItemColor?: number;
    }
    interface data_gemeffects_Item_GrantedEffect {
      TableName?: string;
      Id?: string;
    }
    interface data_gemeffects_Item_GrantedEffectHardmode {
      TableName?: string;
      Id?: string;
    }
    interface data_gemeffects_Item_GrantedEffect2 {
      TableName?: string;
      Id?: string;
    }
    interface data_gemeffects_Item_Consumed_ModsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_gemeffects extends Array<data_gemeffects_Item> {}
    
    export type data_gemtags = any[];
    
    interface data_genericbuffauras_Item {
      Id?: string;
    }
    export interface data_genericbuffauras extends Array<data_genericbuffauras_Item> {}
    
    interface data_genericleaguerewardtypes_Item {
      Id?: string;
      MinLevel?: number;
      MaxLevel?: number;
    }
    export interface data_genericleaguerewardtypes extends Array<data_genericleaguerewardtypes_Item> {}
    
    interface data_genericleaguerewardtypevisuals_Item {
      Type?: data_genericleaguerewardtypevisuals_Item_Type;
      Unk001?: data_genericleaguerewardtypevisuals_Item_Unk001;
      Unk002?: data_genericleaguerewardtypevisuals_Item_Unk002;
      Unk003?: number;
      Icon?: string;
      Name?: string;
    }
    interface data_genericleaguerewardtypevisuals_Item_Type {
      TableName?: string;
      Id?: string;
    }
    interface data_genericleaguerewardtypevisuals_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_genericleaguerewardtypevisuals_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_genericleaguerewardtypevisuals extends Array<data_genericleaguerewardtypevisuals_Item> {}
    
    export type data_genericskillindicator = any[];
    
    interface data_geometryattack_Item {
      Unk000?: number;
      Unk001?: any[];
      Unk002?: any[];
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: boolean;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: boolean;
      Unk013?: boolean;
      Unk014?: any[];
      Unk015?: number;
      Unk016?: number;
      Unk017?: number;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
      Unk021?: boolean;
      Unk022?: boolean;
      Unk023?: number;
      Unk024?: number;
      Unk025?: boolean;
      Unk026?: number;
      Unk027?: boolean;
      Unk028?: any;
      Unk029?: any[];
      Unk030?: number;
      Unk031?: boolean;
      Unk032?: boolean;
      Unk033?: any;
      Unk034?: boolean;
      Unk035?: any[];
      Unk036?: boolean;
      Unk037?: boolean;
      Unk038?: any;
      Unk039?: boolean;
      Unk040?: boolean;
      Unk041?: any[];
      Unk042?: boolean;
      Unk043?: boolean;
      Unk044?: boolean;
      Unk045?: boolean;
      Unk046?: number;
      Unk047?: boolean;
      Unk048?: boolean;
      Unk049?: number;
      Unk050?: number;
      Unk051?: number;
      Unk052?: boolean;
      Unk053?: any;
      Unk054?: data_geometryattack_Item_Unk054;
    }
    interface data_geometryattack_Item_Unk054 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_geometryattack extends Array<data_geometryattack_Item> {}
    
    interface data_geometrychannel_Item {
      Id?: string;
      Unk001?: data_geometrychannel_Item_Unk001;
      Unk002?: data_geometrychannel_Item_Unk002;
      Unk003?: any;
      Unk004?: string;
      Unk005?: string;
      Unk006?: string;
      Unk007?: boolean;
      Unk008?: boolean;
      Unk009?: any;
      Unk010?: any;
      EPKFile?: string;
      Unk012?: number;
      Unk013?: number;
    }
    interface data_geometrychannel_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_geometrychannel_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_geometrychannel extends Array<data_geometrychannel_Item> {}
    
    interface data_geometryprojectiles_Item {
      Unk000?: number;
      Unk001?: data_geometryprojectiles_Item_Unk001;
      Unk002?: boolean;
      Unk003?: number;
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: number;
      Unk007?: boolean;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: boolean;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: boolean;
      Unk016?: boolean;
      Unk017?: boolean;
      Unk018?: any;
      Unk019?: boolean;
      Unk020?: any;
      Unk021?: number;
    }
    interface data_geometryprojectiles_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_geometryprojectiles extends Array<data_geometryprojectiles_Item> {}
    
    interface data_geometrytrigger_Item {
      Unk000?: number;
      Unk001?: any;
      Unk002?: any;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: number;
      Unk017?: number;
      Unk018?: boolean;
      Unk019?: number;
      Unk020?: boolean;
      Unk021?: number;
      Unk022?: number;
      Unk023?: boolean;
      Unk024?: number;
      Unk025?: any[];
      Unk026?: number;
      Unk027?: boolean;
      Unk028?: number;
      Unk029?: boolean;
      Unk030?: boolean;
      Unk031?: number;
      Unk032?: boolean;
      Unk033?: boolean;
      Unk034?: any;
      Unk035?: boolean;
      Unk036?: boolean;
      Unk037?: boolean;
      Unk038?: number;
      Unk039?: number;
      Unk040?: number;
      Unk041?: number;
      Unk042?: boolean;
      Unk043?: number;
      Unk044?: number;
      Unk045?: data_geometrytrigger_Item_Unk045;
      Unk046?: number;
      Unk047?: number;
      Unk048?: number;
      Unk049?: number;
      Unk050?: number;
      Unk051?: boolean;
      Unk052?: boolean;
      Unk053?: boolean;
    }
    interface data_geometrytrigger_Item_Unk045 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_geometrytrigger extends Array<data_geometrytrigger_Item> {}
    
    interface data_giftwrapartvariations_Item {
      Width?: number;
      Height?: number;
      Unk002?: number;
      Item?: data_giftwrapartvariations_Item_Item;
    }
    interface data_giftwrapartvariations_Item_Item {
      TableName?: string;
      Id?: string;
    }
    export interface data_giftwrapartvariations extends Array<data_giftwrapartvariations_Item> {}
    
    interface data_globalaudioconfig_Item {
      Id?: string;
      Value?: number;
      Unk002?: boolean;
    }
    export interface data_globalaudioconfig extends Array<data_globalaudioconfig_Item> {}
    
    export type data_goldbasetypeprices = any[];
    
    export type data_goldinherentskillpricesperlevel = any[];
    
    interface data_goldmodprices_Item {
      Id?: data_goldmodprices_Item_Id;
      Value?: number;
      Weight?: number;
      Unk003?: number;
      Unk004?: number;
      Tags?: any[];
      SpawnWeight?: number[];
      Unk007?: data_goldmodprices_Item_Unk007;
      Unk008?: any[];
    }
    interface data_goldmodprices_Item_Id {
      TableName?: string;
      Id?: string;
    }
    interface data_goldmodprices_Item_Unk007 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_goldmodprices extends Array<data_goldmodprices_Item> {}
    
    export type data_goldrespecprices = any[];
    
    export type data_goldvisualidentities = any[];
    
    export type data_grantedeffectlabels = any[];
    
    interface data_grantedeffectqualitystats_Item {
      GrantedEffectsKey?: data_grantedeffectqualitystats_Item_GrantedEffectsKey;
      StatsKeys?: any[];
      StatsValuesPermille?: number[];
      Unk003?: any[];
      Unk004?: any[];
    }
    interface data_grantedeffectqualitystats_Item_GrantedEffectsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_grantedeffectqualitystats extends Array<data_grantedeffectqualitystats_Item> {}
    
    interface data_grantedeffects_Item {
      Id?: string;
      IsSupport?: boolean;
      AllowedActiveSkillTypes?: any[];
      SupportGemLetter?: string;
      Attribute?: number;
      AddedActiveSkillTypes?: any[];
      ExcludedActiveSkillTypes?: any[];
      SupportsGemsOnly?: boolean;
      Unk008?: number;
      Unk009?: any[];
      CannotBeSupported?: boolean;
      Unk011?: number;
      CastTime?: number;
      ActiveSkill?: data_grantedeffects_Item_ActiveSkill;
      IgnoreMinionTypes?: boolean;
      Unk015?: boolean;
      AddedMinionActiveSkillTypes?: any[];
      Animation?: any;
      MultiPartAchievement?: data_grantedeffects_Item_MultiPartAchievement;
      Unk019?: boolean;
      SupportWeaponRestrictions?: any[];
      RegularVariant?: data_grantedeffects_Item_RegularVariant;
      Unk022?: number;
      Unk023?: number;
      Unk024?: number;
      Unk025?: boolean;
      StatSet?: data_grantedeffects_Item_StatSet;
      Unk027?: any[];
    }
    interface data_grantedeffects_Item_ActiveSkill {
      TableName?: string;
      RowIndex?: number;
    }
    interface data_grantedeffects_Item_MultiPartAchievement {
      TableName?: string;
      RowIndex?: number;
    }
    interface data_grantedeffects_Item_RegularVariant {
      TableName?: string;
      Id?: string;
    }
    interface data_grantedeffects_Item_StatSet {
      TableName?: string;
      RowIndex?: number;
    }
    export interface data_grantedeffects extends Array<data_grantedeffects_Item> {}
    
    export type data_grantedeffectsperlevel = any[];
    
    interface data_grantedeffectstatsets_Item {
      Id?: string;
      ImplicitStats?: any;
      ConstantStats?: any[];
      ConstantStatsValues?: number[];
      BaseEffectiveness?: number;
      IncrementalEffectiveness?: number;
      Unk006?: number;
    }
    export interface data_grantedeffectstatsets extends Array<data_grantedeffectstatsets_Item> {}
    
    interface data_grantedeffectstatsetsperlevel_Item {
      StatSet?: data_grantedeffectstatsetsperlevel_Item_StatSet;
      GemLevel?: number;
      PlayerLevelReq?: number;
      SpellCritChance?: number;
      AttackCritChance?: number;
      BaseMultiplier?: number;
      DamageEffectiveness?: number;
      BaseResolvedValues?: any[];
      AdditionalStatsValues?: any[];
      GrantedEffects?: any[];
      AdditionalFlags?: any[];
      FloatStats?: any[];
      InterpolationBases?: any[];
      AdditionalStats?: any[];
      StatInterpolations?: any[];
      FloatStatsValues?: any[];
    }
    interface data_grantedeffectstatsetsperlevel_Item_StatSet {
      TableName?: string;
      Id?: string;
    }
    export interface data_grantedeffectstatsetsperlevel extends Array<data_grantedeffectstatsetsperlevel_Item> {}
    
    export type data_grantedskillsocketnumbers = any[];
    
    export type data_graphicalitemreceptacle = any[];
    
    export type data_graphicalitemreceptacleslot = any[];
    
    interface data_groundeffects_Item {
      GroundEffectTypesKey?: data_groundeffects_Item_GroundEffectTypesKey;
      Unk001?: number;
      Unk002?: number;
      Unk003?: any;
      Unk004?: number;
      Unk005?: number[];
      Unk006?: boolean;
      AOFile?: string[];
      Unk008?: string[];
      EndEffect?: string;
      Unk010?: any;
      Unk011?: any;
      Unk012?: any;
      Unk013?: any;
      Unk014?: any;
      Unk015?: boolean;
      Unk016?: boolean;
      Unk017?: boolean;
      Unk018?: any;
      Unk019?: any;
      Unk020?: boolean;
      Unk021?: boolean;
      Unk022?: boolean;
    }
    interface data_groundeffects_Item_GroundEffectTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_groundeffects extends Array<data_groundeffects_Item> {}
    
    interface data_groundeffecttypes_Item {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: data_groundeffecttypes_Item_Unk003;
      Unk004?: data_groundeffecttypes_Item_Unk004;
      Unk005?: any;
    }
    interface data_groundeffecttypes_Item_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_groundeffecttypes_Item_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_groundeffecttypes extends Array<data_groundeffecttypes_Item> {}
    
    export type data_hapticevents = any[];
    
    export type data_harbingers = any[];
    
    interface data_harvestcraftcostscalingbybasetype_Item {
      Unk000?: data_harvestcraftcostscalingbybasetype_Item_Unk000;
      Unk001?: data_harvestcraftcostscalingbybasetype_Item_Unk001;
      Unk002?: number;
    }
    interface data_harvestcraftcostscalingbybasetype_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_harvestcraftcostscalingbybasetype_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_harvestcraftcostscalingbybasetype extends Array<data_harvestcraftcostscalingbybasetype_Item> {}
    
    interface data_harvestcraftfilters_Item {
      Id?: string;
      BaseItem?: data_harvestcraftfilters_Item_BaseItem;
      Name?: string;
    }
    interface data_harvestcraftfilters_Item_BaseItem {
      TableName?: string;
      Id?: string;
    }
    export interface data_harvestcraftfilters extends Array<data_harvestcraftfilters_Item> {}
    
    interface data_harvestcraftoptionicons_Item {
      Id?: string;
      DDSFile?: string;
    }
    export interface data_harvestcraftoptionicons extends Array<data_harvestcraftoptionicons_Item> {}
    
    interface data_harvestcraftoptions_Item {
      Id?: string;
      Text?: string;
      Tier?: data_harvestcraftoptions_Item_Tier;
      Command?: string;
      Parameters?: string;
      Unk005?: any[];
      HASH16?: number;
      Description?: string;
      IsEnchant?: boolean;
      LifeforceType?: number;
      LifeforceCost?: number;
      SacredCost?: number;
      Unk012?: boolean;
      Achievements?: any[];
      Unk014?: number;
    }
    interface data_harvestcraftoptions_Item_Tier {
      TableName?: string;
      Id?: string;
    }
    export interface data_harvestcraftoptions extends Array<data_harvestcraftoptions_Item> {}
    
    interface data_harvestcrafttiers_Item {
      Id?: string;
      FrameImage?: string;
      FrameHighlight?: string;
    }
    export interface data_harvestcrafttiers extends Array<data_harvestcrafttiers_Item> {}
    
    interface data_harvestinfrastructure_Item {
      Object?: string;
      Unk001?: number;
      ClientStringsKey?: any;
    }
    export interface data_harvestinfrastructure extends Array<data_harvestinfrastructure_Item> {}
    
    interface data_harvestlifescalingperlevel_Item {
      Level?: number;
      Life?: number;
    }
    export interface data_harvestlifescalingperlevel extends Array<data_harvestlifescalingperlevel_Item> {}
    
    export type data_harvestperlevelvalues = any[];
    
    interface data_harvestseeditems_Item {
      Id?: number;
      BaseItem?: data_harvestseeditems_Item_BaseItem;
      DropStat?: data_harvestseeditems_Item_DropStat;
    }
    interface data_harvestseeditems_Item_BaseItem {
      TableName?: string;
      Id?: string;
    }
    interface data_harvestseeditems_Item_DropStat {
      TableName?: string;
      Id?: string;
    }
    export interface data_harvestseeditems extends Array<data_harvestseeditems_Item> {}
    
    export type data_harvestseeds = any[];
    
    export type data_heistareaformationlayout = any[];
    
    export type data_heistareas = any[];
    
    interface data_heistbalanceperlevel_Item {
      Level?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      HeistValueScalingKey1?: data_heistbalanceperlevel_Item_HeistValueScalingKey1;
      HeistValueScalingKey2?: data_heistbalanceperlevel_Item_HeistValueScalingKey2;
      HeistValueScalingKey3?: data_heistbalanceperlevel_Item_HeistValueScalingKey3;
      HeistValueScalingKey4?: data_heistbalanceperlevel_Item_HeistValueScalingKey4;
      HeistValueScalingKey5?: data_heistbalanceperlevel_Item_HeistValueScalingKey5;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      HeistValueScalingKey6?: data_heistbalanceperlevel_Item_HeistValueScalingKey6;
      HeistValueScalingKey7?: data_heistbalanceperlevel_Item_HeistValueScalingKey7;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
    }
    interface data_heistbalanceperlevel_Item_HeistValueScalingKey1 {
      TableName?: string;
      Id?: string;
    }
    interface data_heistbalanceperlevel_Item_HeistValueScalingKey2 {
      TableName?: string;
      Id?: string;
    }
    interface data_heistbalanceperlevel_Item_HeistValueScalingKey3 {
      TableName?: string;
      Id?: string;
    }
    interface data_heistbalanceperlevel_Item_HeistValueScalingKey4 {
      TableName?: string;
      Id?: string;
    }
    interface data_heistbalanceperlevel_Item_HeistValueScalingKey5 {
      TableName?: string;
      Id?: string;
    }
    interface data_heistbalanceperlevel_Item_HeistValueScalingKey6 {
      TableName?: string;
      Id?: string;
    }
    interface data_heistbalanceperlevel_Item_HeistValueScalingKey7 {
      TableName?: string;
      Id?: string;
    }
    export interface data_heistbalanceperlevel extends Array<data_heistbalanceperlevel_Item> {}
    
    export type data_heistchestrewardtypes = any[];
    
    export type data_heistchests = any[];
    
    export type data_heistchokepointformation = any[];
    
    interface data_heistconstants_Item {
      Id?: string;
      Value?: number;
    }
    export interface data_heistconstants extends Array<data_heistconstants_Item> {}
    
    export type data_heistcontracts = any[];
    
    interface data_heistdoodadnpcs_Item {
      NPCsKey?: data_heistdoodadnpcs_Item_NPCsKey;
      Unk001?: any;
      Unk002?: data_heistdoodadnpcs_Item_Unk002;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      AOFile?: string;
      Stance?: string;
      BetrayalTargetsKey?: any;
    }
    interface data_heistdoodadnpcs_Item_NPCsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_heistdoodadnpcs_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_heistdoodadnpcs extends Array<data_heistdoodadnpcs_Item> {}
    
    interface data_heistdoors_Item {
      Id?: string;
      Unk001?: string;
      HeistJobsKey1?: any;
      HeistJobsKey2?: any;
      Unk004?: string;
      Unk005?: any[];
      Unk006?: any[];
      Unk007?: number;
      HeistAreasKey?: any;
    }
    export interface data_heistdoors extends Array<data_heistdoors_Item> {}
    
    interface data_heistequipment_Item {
      BaseItemTypesKey?: data_heistequipment_Item_BaseItemTypesKey;
      RequiredJob_HeistJobsKey?: any;
      RequiredLevel?: number;
    }
    interface data_heistequipment_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_heistequipment extends Array<data_heistequipment_Item> {}
    
    interface data_heistgeneration_Item {
      Level?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: number;
      Unk017?: number;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
    }
    export interface data_heistgeneration extends Array<data_heistgeneration_Item> {}
    
    export type data_heistintroareas = any[];
    
    interface data_heistjobs_Item {
      Id?: string;
      Name?: string;
      RequiredSkillIcon?: string;
      SkillIcon?: string;
      Unk004?: number;
      Unk005?: number;
      MapIcon?: string;
      Level_StatsKey?: data_heistjobs_Item_Level_StatsKey;
      Alert_StatsKey?: data_heistjobs_Item_Alert_StatsKey;
      Alarm_StatsKey?: data_heistjobs_Item_Alarm_StatsKey;
      Cost_StatsKey?: data_heistjobs_Item_Cost_StatsKey;
      ExperienceGain_StatsKey?: data_heistjobs_Item_ExperienceGain_StatsKey;
      ConsoleBlueprintLegend?: string;
      Description?: string;
    }
    interface data_heistjobs_Item_Level_StatsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_heistjobs_Item_Alert_StatsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_heistjobs_Item_Alarm_StatsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_heistjobs_Item_Cost_StatsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_heistjobs_Item_ExperienceGain_StatsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_heistjobs extends Array<data_heistjobs_Item> {}
    
    interface data_heistjobsexperienceperlevel_Item {
      HeistJobsKey?: data_heistjobsexperienceperlevel_Item_HeistJobsKey;
      Tier?: number;
      Experience?: number;
      MinLevel?: number;
      AchievementItemsKey?: any[];
    }
    interface data_heistjobsexperienceperlevel_Item_HeistJobsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_heistjobsexperienceperlevel extends Array<data_heistjobsexperienceperlevel_Item> {}
    
    interface data_heistlocktype_Item {
      Id?: string;
      HeistJobsKey?: data_heistlocktype_Item_HeistJobsKey;
      SkillIcon?: string;
    }
    interface data_heistlocktype_Item_HeistJobsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_heistlocktype extends Array<data_heistlocktype_Item> {}
    
    export type data_heistnpcauras = any[];
    
    interface data_heistnpcblueprinttypes_Item {
      NPCsKey?: data_heistnpcblueprinttypes_Item_NPCsKey;
      Unk001?: number;
    }
    interface data_heistnpcblueprinttypes_Item_NPCsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_heistnpcblueprinttypes extends Array<data_heistnpcblueprinttypes_Item> {}
    
    interface data_heistnpcdialogue_Item {
      DialogueEventKey?: data_heistnpcdialogue_Item_DialogueEventKey;
      HeistNPCsKey?: data_heistnpcdialogue_Item_HeistNPCsKey;
      AudioNormal?: any[];
      AudioLoud?: any[];
      Unk004?: number;
    }
    interface data_heistnpcdialogue_Item_DialogueEventKey {
      TableName?: string;
      Id?: string;
    }
    interface data_heistnpcdialogue_Item_HeistNPCsKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface data_heistnpcdialogue extends Array<data_heistnpcdialogue_Item> {}
    
    interface data_heistnpcs_Item {
      NPCsKey?: data_heistnpcs_Item_NPCsKey;
      MonsterVarietiesKey?: data_heistnpcs_Item_MonsterVarietiesKey;
      SkillLevel_HeistJobsKeys?: any[];
      PortraitFile?: string;
      HeistNPCStatsKeys?: any[];
      StatValues?: number[];
      Unk006?: number;
      SkillLevel_Values?: number[];
      Name?: string;
      SilhouetteFile?: string;
      Unk010?: number;
      Unk011?: number;
      HeistNPCsKey?: any;
      StatValues2?: number[];
      Ally_NPCsKey?: data_heistnpcs_Item_Ally_NPCsKey;
      ActiveNPCIcon?: string;
      HeistJobsKey?: data_heistnpcs_Item_HeistJobsKey;
      Equip_AchievementItemsKeys?: any[];
      AOFile?: string;
      Unk019?: data_heistnpcs_Item_Unk019;
    }
    interface data_heistnpcs_Item_NPCsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_heistnpcs_Item_MonsterVarietiesKey {
      TableName?: string;
      Id?: string;
    }
    interface data_heistnpcs_Item_Ally_NPCsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_heistnpcs_Item_HeistJobsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_heistnpcs_Item_Unk019 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_heistnpcs extends Array<data_heistnpcs_Item> {}
    
    interface data_heistnpcstats_Item {
      StatsKey?: data_heistnpcstats_Item_StatsKey;
      Unk001?: boolean;
      Unk002?: boolean;
      Unk003?: boolean;
      Unk004?: boolean;
    }
    interface data_heistnpcstats_Item_StatsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_heistnpcstats extends Array<data_heistnpcstats_Item> {}
    
    interface data_heistobjectives_Item {
      BaseItemType?: data_heistobjectives_Item_BaseItemType;
      Scaling?: number;
      Name?: string;
    }
    interface data_heistobjectives_Item_BaseItemType {
      TableName?: string;
      Id?: string;
    }
    export interface data_heistobjectives extends Array<data_heistobjectives_Item> {}
    
    interface data_heistobjectivevaluedescriptions_Item {
      Tier?: number;
      MarkersMultiply?: number;
      Description?: string;
    }
    export interface data_heistobjectivevaluedescriptions extends Array<data_heistobjectivevaluedescriptions_Item> {}
    
    export type data_heistpatrolpacks = any[];
    
    export type data_heistquestcontracts = any[];
    
    interface data_heistrevealingnpcs_Item {
      NPCsKey?: data_heistrevealingnpcs_Item_NPCsKey;
      PortraitFile?: string;
      NPCAudioKey?: any[];
      Unk003?: number;
    }
    interface data_heistrevealingnpcs_Item_NPCsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_heistrevealingnpcs extends Array<data_heistrevealingnpcs_Item> {}
    
    export type data_heistrooms = any[];
    
    export type data_heiststoragelayout = any[];
    
    interface data_heistvaluescaling_Item {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
    }
    export interface data_heistvaluescaling extends Array<data_heistvaluescaling_Item> {}
    
    interface data_hellscapeaoreplacements_Item {
      Original?: string;
      HASH32?: number;
      Replacement?: string;
    }
    export interface data_hellscapeaoreplacements extends Array<data_hellscapeaoreplacements_Item> {}
    
    export type data_hellscapeareapacks = any[];
    
    interface data_hellscapeexperiencelevels_Item {
      Level?: number;
      Experience?: number;
    }
    export interface data_hellscapeexperiencelevels extends Array<data_hellscapeexperiencelevels_Item> {}
    
    export type data_hellscapefactions = any[];
    
    interface data_hellscapeimmunemonsters_Item {
      Monster?: data_hellscapeimmunemonsters_Item_Monster;
    }
    interface data_hellscapeimmunemonsters_Item_Monster {
      TableName?: string;
      Id?: string;
    }
    export interface data_hellscapeimmunemonsters extends Array<data_hellscapeimmunemonsters_Item> {}
    
    interface data_hellscapeitemmodificationtiers_Item {
      Tier?: number;
      IsMap?: boolean;
      Unk002?: number;
      MinItemLvl?: number;
    }
    export interface data_hellscapeitemmodificationtiers extends Array<data_hellscapeitemmodificationtiers_Item> {}
    
    interface data_hellscapelifescalingperlevel_Item {
      AreaLevel?: number;
      Scale?: number;
    }
    export interface data_hellscapelifescalingperlevel extends Array<data_hellscapelifescalingperlevel_Item> {}
    
    interface data_hellscapemodificationinventorylayout_Item {
      Id?: string;
      Column?: number;
      Row?: number;
      IsMapSlot?: boolean;
      Unk004?: number;
      Width?: number;
      Height?: number;
      Stat?: any;
      StatValue?: number;
      UnlockedWith?: any;
      Quest?: any;
    }
    export interface data_hellscapemodificationinventorylayout extends Array<data_hellscapemodificationinventorylayout_Item> {}
    
    export type data_hellscapemods = any[];
    
    export type data_hellscapemonsterpacks = any[];
    
    interface data_hellscapepassives_Item {
      Id?: string;
      Name?: string;
      Stats?: any[];
      StatsValues?: number[];
      Points?: number;
      HASH16?: number;
      Icon?: string;
      IconMaxed?: string;
      SoundEffect?: any;
      Unk009?: number;
      Quest?: any;
    }
    export interface data_hellscapepassives extends Array<data_hellscapepassives_Item> {}
    
    interface data_hellscapepassivetree_Item {
      Id?: string;
      AllocationsRequired?: number;
      Passives?: any[];
    }
    export interface data_hellscapepassivetree extends Array<data_hellscapepassivetree_Item> {}
    
    interface data_hideoutcraftingbenchdoodads_Item {
      Unk000?: data_hideoutcraftingbenchdoodads_Item_Unk000;
      Unk001?: data_hideoutcraftingbenchdoodads_Item_Unk001;
    }
    interface data_hideoutcraftingbenchdoodads_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_hideoutcraftingbenchdoodads_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_hideoutcraftingbenchdoodads extends Array<data_hideoutcraftingbenchdoodads_Item> {}
    
    interface data_hideoutcraftingbenchinterfacevisuals_Item {
      Id?: string;
      Unk001?: string;
      Unk002?: string;
      Unk003?: string;
      Unk004?: string;
      Unk005?: string;
    }
    export interface data_hideoutcraftingbenchinterfacevisuals extends Array<data_hideoutcraftingbenchinterfacevisuals_Item> {}
    
    interface data_hideoutdoodadcategory_Item {
      Id?: string;
      Name?: string;
    }
    export interface data_hideoutdoodadcategory extends Array<data_hideoutdoodadcategory_Item> {}
    
    interface data_hideoutdoodads_Item {
      BaseItemTypesKey?: data_hideoutdoodads_Item_BaseItemTypesKey;
      Variation_AOFiles?: string[];
      IsNonMasterDoodad?: boolean;
      InheritsFrom?: string;
      Unk004?: boolean;
      IsCraftingBench?: boolean;
      Tags?: any[];
      Unk007?: boolean;
      Unk008?: any;
      Category?: data_hideoutdoodads_Item_Category;
      Unk010?: number;
      Unk011?: boolean;
      Unk012?: any;
      Unk013?: boolean;
      Unk014?: any;
      Unk015?: any[];
      Unk016?: number;
      Unk017?: number;
      Unk018?: boolean;
      Unk019?: boolean;
    }
    interface data_hideoutdoodads_Item_BaseItemTypesKey {
      TableName?: string;
      RowIndex?: number;
    }
    interface data_hideoutdoodads_Item_Category {
      TableName?: string;
      Id?: string;
    }
    export interface data_hideoutdoodads extends Array<data_hideoutdoodads_Item> {}
    
    interface data_hideoutdoodadtags_Item {
      Id?: string;
      Unk001?: number[];
      Unk002?: number[];
      Name?: string;
    }
    export interface data_hideoutdoodadtags extends Array<data_hideoutdoodadtags_Item> {}
    
    export type data_hideoutnpcs = any[];
    
    interface data_hideoutrarity_Item {
      Id?: string;
      Text?: string;
    }
    export interface data_hideoutrarity extends Array<data_hideoutrarity_Item> {}
    
    export type data_hideoutresistpenalties = any[];
    
    export type data_hideouts = any[];
    
    interface data_hideoutstashdoodads_Item {
      Unk000?: data_hideoutstashdoodads_Item_Unk000;
      Unk001?: boolean;
      Unk002?: boolean;
      Unk003?: boolean;
    }
    interface data_hideoutstashdoodads_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_hideoutstashdoodads extends Array<data_hideoutstashdoodads_Item> {}
    
    interface data_hideoutwaypointdoodads_Item {
      Unk000?: data_hideoutwaypointdoodads_Item_Unk000;
      Unk001?: number[];
    }
    interface data_hideoutwaypointdoodads_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_hideoutwaypointdoodads extends Array<data_hideoutwaypointdoodads_Item> {}
    
    interface data_hudenergyshieldvisuals_Item {
      Id?: string;
      Unk001?: string;
      Unk002?: string;
      Unk003?: string;
      Unk004?: string;
      Unk005?: string;
      Unk006?: string;
      Unk007?: string;
      Unk008?: string;
      Unk009?: boolean;
    }
    export interface data_hudenergyshieldvisuals extends Array<data_hudenergyshieldvisuals_Item> {}
    
    interface data_hudlifevisuals_Item {
      Id?: string;
      Unk001?: string;
      Unk002?: string;
      Unk003?: string;
      Unk004?: string;
      Unk005?: string;
      Unk006?: string;
      Unk007?: string;
      Unk008?: string;
      Unk009?: string;
      Unk010?: string;
      Unk011?: string;
      Unk012?: number;
      Unk013?: string;
    }
    export interface data_hudlifevisuals extends Array<data_hudlifevisuals_Item> {}
    
    export type data_hudvisualsfromstat = any[];
    
    interface data_impactsounddata_Item {
      Id?: string;
      Sound?: string;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
    }
    export interface data_impactsounddata extends Array<data_impactsounddata_Item> {}
    
    interface data_incubators_Item {
      BaseItemTypesKey?: data_incubators_Item_BaseItemTypesKey;
      Unk001?: number;
      Description?: string;
      HASH16?: number;
      AchievementItemsKeys?: any[];
    }
    interface data_incubators_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_incubators extends Array<data_incubators_Item> {}
    
    interface data_incursionarchitect_Item {
      MonsterVarietiesKey?: data_incursionarchitect_Item_MonsterVarietiesKey;
      MinLevel?: number;
    }
    interface data_incursionarchitect_Item_MonsterVarietiesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_incursionarchitect extends Array<data_incursionarchitect_Item> {}
    
    export type data_incursionbrackets = any[];
    
    export type data_incursionchestrewards = any[];
    
    export type data_incursionchests = any[];
    
    export type data_incursionroombossfightevents = any[];
    
    export type data_incursionrooms = any[];
    
    interface data_incursionuniqueupgradecomponents_Item {
      BaseUnique?: data_incursionuniqueupgradecomponents_Item_BaseUnique;
      UpgradeCurrency?: data_incursionuniqueupgradecomponents_Item_UpgradeCurrency;
    }
    interface data_incursionuniqueupgradecomponents_Item_BaseUnique {
      TableName?: string;
      Text?: string;
    }
    interface data_incursionuniqueupgradecomponents_Item_UpgradeCurrency {
      TableName?: string;
      Id?: string;
    }
    export interface data_incursionuniqueupgradecomponents extends Array<data_incursionuniqueupgradecomponents_Item> {}
    
    export type data_indexablesupportgems = any[];
    
    export type data_indicatorconditions = any[];
    
    interface data_influenceexalts_Item {
      Influence?: number;
      BaseItemTypesKey?: any;
    }
    export interface data_influenceexalts extends Array<data_influenceexalts_Item> {}
    
    export type data_influencemodupgrades = any[];
    
    interface data_influencetags_Item {
      ItemClass?: data_influencetags_Item_ItemClass;
      Influence?: number;
      Tag?: data_influencetags_Item_Tag;
    }
    interface data_influencetags_Item_ItemClass {
      TableName?: string;
      Id?: string;
    }
    interface data_influencetags_Item_Tag {
      TableName?: string;
      Id?: string;
    }
    export interface data_influencetags extends Array<data_influencetags_Item> {}
    
    interface data_invasionmonsterrestrictions_Item {
      Id?: string;
      WorldAreasKey?: data_invasionmonsterrestrictions_Item_WorldAreasKey;
      MonsterVarietiesKeys?: any[];
      Unk003?: number[];
    }
    interface data_invasionmonsterrestrictions_Item_WorldAreasKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_invasionmonsterrestrictions extends Array<data_invasionmonsterrestrictions_Item> {}
    
    export type data_invasionmonstersperarea = any[];
    
    interface data_inventories_Item {
      Id?: string;
      InventoryIdKey?: number;
      InventoryTypeKey?: number;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: boolean;
      Unk007?: number;
    }
    export interface data_inventories extends Array<data_inventories_Item> {}
    
    interface data_itemclasscategories_Item {
      Id?: string;
      Text?: string;
      Unk002?: any;
    }
    export interface data_itemclasscategories extends Array<data_itemclasscategories_Item> {}
    
    interface data_itemclasses_Item {
      Id?: string;
      Name?: string;
      TradeMarketCategory?: data_itemclasses_Item_TradeMarketCategory;
      ItemClassCategory?: data_itemclasses_Item_ItemClassCategory;
      RemovedIfLeavesArea?: boolean;
      Unk005?: any[];
      IdentifyAchievements?: any[];
      AllocateToMapOwner?: boolean;
      AlwaysAllocate?: boolean;
      CanHaveVeiledMods?: boolean;
      PickedUpQuest?: any;
      Unk011?: number;
      AlwaysShow?: boolean;
      CanBeCorrupted?: boolean;
      CanHaveIncubators?: boolean;
      CanHaveInfluence?: boolean;
      CanBeDoubleCorrupted?: boolean;
      CanHaveAspects?: boolean;
      CanTransferSkin?: boolean;
      ItemStance?: any;
      CanScourge?: boolean;
      CanUpgradeRarity?: boolean;
      Unk022?: boolean;
      Unk023?: boolean;
      MaxInventoryDimensions?: any[];
      Flags?: any[];
      Unmodifiable?: boolean;
      CanBeFractured?: boolean;
      EquipAchievements?: any;
    }
    interface data_itemclasses_Item_TradeMarketCategory {
      TableName?: string;
      Id?: string;
    }
    interface data_itemclasses_Item_ItemClassCategory {
      TableName?: string;
      Id?: string;
    }
    export interface data_itemclasses extends Array<data_itemclasses_Item> {}
    
    export type data_itemdisenchantvalues = any[];
    
    interface data_itemexperienceperlevel_Item {
      ItemExperienceType?: data_itemexperienceperlevel_Item_ItemExperienceType;
      ItemCurrentLevel?: number;
      Experience?: number;
    }
    interface data_itemexperienceperlevel_Item_ItemExperienceType {
      TableName?: string;
      Id?: string;
    }
    export interface data_itemexperienceperlevel extends Array<data_itemexperienceperlevel_Item> {}
    
    interface data_itemexperiencetypes_Item {
      Id?: string;
    }
    export interface data_itemexperiencetypes extends Array<data_itemexperiencetypes_Item> {}
    
    export type data_itemframetype = any[];
    
    export type data_iteminherentskills = any[];
    
    interface data_itemisedvisualeffect_Item {
      EffectBaseType?: data_itemisedvisualeffect_Item_EffectBaseType;
      VisualEffect?: data_itemisedvisualeffect_Item_VisualEffect;
      VisualIdentity?: any;
      Stats?: any[];
      ItemClasses?: any[];
      Unk005?: any[];
      Unk006?: boolean;
      Unk007?: any[];
      Unk008?: number[];
      Unk009?: boolean;
      Unk010?: any[];
      Unk011?: boolean;
      Unk012?: any[];
      Unk013?: any[];
      Unk014?: any[];
      Unk015?: any[];
      Unk016?: any;
      Unk017?: boolean;
      Unk018?: any;
    }
    interface data_itemisedvisualeffect_Item_EffectBaseType {
      TableName?: string;
      Id?: string;
    }
    interface data_itemisedvisualeffect_Item_VisualEffect {
      TableName?: string;
      Id?: string;
    }
    export interface data_itemisedvisualeffect extends Array<data_itemisedvisualeffect_Item> {}
    
    export type data_itemisedvisualeffectexclusivetypes = any[];
    
    interface data_itemnotecode_Item {
      BaseItem?: data_itemnotecode_Item_BaseItem;
      Code?: string;
      Order1?: number;
      Show?: boolean;
      Order2?: number;
    }
    interface data_itemnotecode_Item_BaseItem {
      TableName?: string;
      Id?: string;
    }
    export interface data_itemnotecode extends Array<data_itemnotecode_Item> {}
    
    export type data_itemspirit = any[];
    
    interface data_itemstances_Item {
      Id?: string;
    }
    export interface data_itemstances extends Array<data_itemstances_Item> {}
    
    export type data_itemtoggleable = any[];
    
    interface data_itemvisualeffect_Item {
      Id?: string;
      DaggerEPKFile?: string;
      BowEPKFile?: string;
      OneHandedMaceEPKFile?: string;
      OneHandedSwordEPKFile?: string;
      Unk005?: string;
      TwoHandedSwordEPKFile?: string;
      TwoHandedStaffEPKFile?: string;
      HASH16?: number;
      TwoHandedMaceEPKFile?: any;
      OneHandedAxeEPKFile?: any;
      TwoHandedAxeEPKFile?: any;
      ClawEPKFile?: any;
      PETFile?: any;
      Shield?: any[];
      Unk015?: boolean;
    }
    export interface data_itemvisualeffect extends Array<data_itemvisualeffect_Item> {}
    
    interface data_itemvisualheldbodymodel_Item {
      ItemVisualIdentity?: data_itemvisualheldbodymodel_Item_ItemVisualIdentity;
      MarauderAnimatedObject?: string;
      RangerAnimatedObject?: string;
      WitchAnimatedObject?: string;
      DuelistAnimatedObject?: string;
      TemplarAnimatedObject?: string;
      ShadowAnimatedObject?: string;
      ScionAnimatedObject?: string;
      MarauderBone?: string;
      RangerBone?: string;
      WitchBone?: string;
      DuelistBone?: string;
      TemplarBone?: string;
      ShadowBone?: string;
      ScionBone?: string;
    }
    interface data_itemvisualheldbodymodel_Item_ItemVisualIdentity {
      TableName?: string;
      Id?: string;
    }
    export interface data_itemvisualheldbodymodel extends Array<data_itemvisualheldbodymodel_Item> {}
    
    export type data_itemvisualheldbodymodeloverridebyitemaffiliatedattributes = any[];
    
    interface data_itemvisualidentity_Item {
      Id?: string;
      DDSFile?: string;
      AOFile?: string;
      InventorySoundEffect?: data_itemvisualidentity_Item_InventorySoundEffect;
      HASH16?: number;
      AOFile2?: string;
    }
    interface data_itemvisualidentity_Item_InventorySoundEffect {
      TableName?: string;
      Id?: string;
    }
    export interface data_itemvisualidentity extends Array<data_itemvisualidentity_Item> {}
    
    interface data_itemvisualreplacement_Item {
      BaseItemType?: data_itemvisualreplacement_Item_BaseItemType;
      Unk001?: data_itemvisualreplacement_Item_Unk001;
      Unk002?: data_itemvisualreplacement_Item_Unk002;
    }
    interface data_itemvisualreplacement_Item_BaseItemType {
      TableName?: string;
      Id?: string;
    }
    interface data_itemvisualreplacement_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_itemvisualreplacement_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_itemvisualreplacement extends Array<data_itemvisualreplacement_Item> {}
    
    interface data_jobassassinationspawnergroups_Item {
      Unk000?: data_jobassassinationspawnergroups_Item_Unk000;
      Unk001?: data_jobassassinationspawnergroups_Item_Unk001;
    }
    interface data_jobassassinationspawnergroups_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_jobassassinationspawnergroups_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_jobassassinationspawnergroups extends Array<data_jobassassinationspawnergroups_Item> {}
    
    export type data_jobraidbrackets = any[];
    
    export type data_keywordpopups = any[];
    
    interface data_killstreakthresholds_Item {
      Kills?: number;
      MonsterVarietiesKey?: any;
      AchievementItemsKey?: data_killstreakthresholds_Item_AchievementItemsKey;
    }
    interface data_killstreakthresholds_Item_AchievementItemsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_killstreakthresholds extends Array<data_killstreakthresholds_Item> {}
    
    export type data_kioskmodecharactertutorials = any[];
    
    interface data_kiraclevels_Item {
      AreaLevel?: number;
      Unk001?: number;
    }
    export interface data_kiraclevels extends Array<data_kiraclevels_Item> {}
    
    interface data_lakebosslifescalingperlevel_Item {
      Level?: number;
      Scaling?: number;
    }
    export interface data_lakebosslifescalingperlevel extends Array<data_lakebosslifescalingperlevel_Item> {}
    
    interface data_leagueflag_Item {
      Id?: string;
      Image?: string;
      IsHC?: boolean;
      IsSSF?: boolean;
      Banner?: string;
      IsRuthless?: boolean;
    }
    export interface data_leagueflag extends Array<data_leagueflag_Item> {}
    
    export type data_leagueinfo = any[];
    
    interface data_leagueinfopanelversions_Item {
      Id?: string;
    }
    export interface data_leagueinfopanelversions extends Array<data_leagueinfopanelversions_Item> {}
    
    interface data_leagueprogressquestflags_Item {
      QuestFlag?: data_leagueprogressquestflags_Item_QuestFlag;
      CompletionString?: data_leagueprogressquestflags_Item_CompletionString;
      Boss?: string;
      Unk003?: boolean;
    }
    interface data_leagueprogressquestflags_Item_QuestFlag {
      TableName?: string;
      Id?: string;
    }
    interface data_leagueprogressquestflags_Item_CompletionString {
      TableName?: string;
      Id?: string;
    }
    export interface data_leagueprogressquestflags extends Array<data_leagueprogressquestflags_Item> {}
    
    export type data_leaguestaticrewards = any[];
    
    interface data_legacyatlasinfluenceoutcomes_Item {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: any;
      Unk006?: number[];
    }
    export interface data_legacyatlasinfluenceoutcomes extends Array<data_legacyatlasinfluenceoutcomes_Item> {}
    
    export type data_legionbalanceperlevel = any[];
    
    interface data_legionchestcounts_Item {
      LegionFactionsKey?: data_legionchestcounts_Item_LegionFactionsKey;
      LegionRanksKey?: data_legionchestcounts_Item_LegionRanksKey;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      MinLevel?: number;
      Unk007?: number;
    }
    interface data_legionchestcounts_Item_LegionFactionsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_legionchestcounts_Item_LegionRanksKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface data_legionchestcounts extends Array<data_legionchestcounts_Item> {}
    
    export type data_legionchesttypes = any[];
    
    interface data_legionfactions_Item {
      Id?: string;
      SpawnWeight?: number;
      LegionBalancePerLevelKey?: data_legionfactions_Item_LegionBalancePerLevelKey;
      Unk003?: number;
      Unk004?: number;
      BuffVisualsKey?: data_legionfactions_Item_BuffVisualsKey;
      MiscAnimatedKey1?: data_legionfactions_Item_MiscAnimatedKey1;
      MiscAnimatedKey2?: data_legionfactions_Item_MiscAnimatedKey2;
      MiscAnimatedKey3?: data_legionfactions_Item_MiscAnimatedKey3;
      AchievementItemsKeys1?: any[];
      MiscAnimatedKey4?: data_legionfactions_Item_MiscAnimatedKey4;
      MiscAnimatedKey5?: data_legionfactions_Item_MiscAnimatedKey5;
      Unk012?: number;
      Unk013?: number;
      AchievementItemsKeys2?: any[];
      StatsKey?: data_legionfactions_Item_StatsKey;
      Shard?: string;
      RewardJewelArt?: string;
    }
    interface data_legionfactions_Item_LegionBalancePerLevelKey {
      TableName?: string;
      RowIndex?: number;
    }
    interface data_legionfactions_Item_BuffVisualsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_legionfactions_Item_MiscAnimatedKey1 {
      TableName?: string;
      Id?: string;
    }
    interface data_legionfactions_Item_MiscAnimatedKey2 {
      TableName?: string;
      Id?: string;
    }
    interface data_legionfactions_Item_MiscAnimatedKey3 {
      TableName?: string;
      Id?: string;
    }
    interface data_legionfactions_Item_MiscAnimatedKey4 {
      TableName?: string;
      Id?: string;
    }
    interface data_legionfactions_Item_MiscAnimatedKey5 {
      TableName?: string;
      Id?: string;
    }
    interface data_legionfactions_Item_StatsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_legionfactions extends Array<data_legionfactions_Item> {}
    
    interface data_legionmonstercounts_Item {
      LegionFactionsKey?: data_legionmonstercounts_Item_LegionFactionsKey;
      LegionRanksKey?: data_legionmonstercounts_Item_LegionRanksKey;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
    }
    interface data_legionmonstercounts_Item_LegionFactionsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_legionmonstercounts_Item_LegionRanksKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface data_legionmonstercounts extends Array<data_legionmonstercounts_Item> {}
    
    export type data_legionmonstervarieties = any[];
    
    export type data_legionranks = any[];
    
    interface data_legionrewardtypevisuals_Item {
      IntId?: number;
      MinimapIconsKey?: data_legionrewardtypevisuals_Item_MinimapIconsKey;
      Unk002?: string;
      MiscAnimatedKey?: data_legionrewardtypevisuals_Item_MiscAnimatedKey;
      Unk004?: number;
      Id?: string;
    }
    interface data_legionrewardtypevisuals_Item_MinimapIconsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_legionrewardtypevisuals_Item_MiscAnimatedKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_legionrewardtypevisuals extends Array<data_legionrewardtypevisuals_Item> {}
    
    interface data_levelrelativeplayerscaling_Item {
      PlayerLevel?: number;
      MonsterLevel?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
    }
    export interface data_levelrelativeplayerscaling extends Array<data_levelrelativeplayerscaling_Item> {}
    
    export type data_loginareas = any[];
    
    interface data_mapcompletionachievements_Item {
      Id?: string;
      MapStatConditionsKeys?: any[];
      StatsKeys?: any[];
      AchievementItemsKeys?: any[];
      MapTierAchievementsKeys?: any[];
      Unk005?: boolean;
      WorldAreasKeys?: any[];
      Unk007?: any[];
    }
    export interface data_mapcompletionachievements extends Array<data_mapcompletionachievements_Item> {}
    
    export type data_mapconnections = any[];
    
    export type data_mapcreationinformation = any[];
    
    export type data_mapcurrencyinventorylayout = any[];
    
    export type data_mapdevicerecipes = any[];
    
    interface data_mapdevices_Item {
      Id?: string;
      MiscObject?: any;
      Unk002?: number;
      Unk003?: string;
      Unk004?: string;
      Unk005?: any[];
      Unk006?: boolean;
      Unk007?: number;
      Unk008?: boolean;
      Unk009?: number;
      Unk010?: boolean;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: boolean;
      Unk017?: boolean;
      Unk018?: boolean;
    }
    export interface data_mapdevices extends Array<data_mapdevices_Item> {}
    
    export type data_mapfragmentmods = any[];
    
    export type data_mapinhabitants = any[];
    
    interface data_mappins_Item {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Name?: string;
      Description?: string;
      Unk008?: number;
      Unk009?: any[];
      Unk010?: number;
      Unk011?: any[];
      Unk012?: number;
      Unk013?: number;
      Unk014?: any;
      Unk015?: any;
      Unk016?: string;
    }
    export interface data_mappins extends Array<data_mappins_Item> {}
    
    interface data_maps_Item {
      MapKeyTier?: data_maps_Item_MapKeyTier;
      SomeRef02?: any;
      UnkLong01?: number;
      UnkLong02?: number;
      SomeRef03?: any;
      UnkLong03?: number;
      UnkLong04?: number;
      Unk015?: boolean;
      Unk016?: boolean;
      Unk017?: boolean;
    }
    interface data_maps_Item_MapKeyTier {
      TableName?: string;
      Id?: string;
    }
    export interface data_maps extends Array<data_maps_Item> {}
    
    export type data_mapseries = any[];
    
    export type data_mapseriestiers = any[];
    
    export type data_mapstashspecialtypeentries = any[];
    
    export type data_mapstashuniquemapinfo = any[];
    
    interface data_mapstatconditions_Item {
      Id?: string;
      StatsKey?: data_mapstatconditions_Item_StatsKey;
      Unk002?: boolean;
      StatMin?: number;
      StatMax?: number;
      Unk005?: boolean;
    }
    interface data_mapstatconditions_Item_StatsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_mapstatconditions extends Array<data_mapstatconditions_Item> {}
    
    interface data_maptierachievements_Item {
      Id?: string;
      AchievementItemsKey?: any[];
      MapTiers?: number[];
    }
    export interface data_maptierachievements extends Array<data_maptierachievements_Item> {}
    
    interface data_maptiers_Item {
      Tier?: number;
      Level?: number;
      Level2?: number;
    }
    export interface data_maptiers extends Array<data_maptiers_Item> {}
    
    interface data_mavendialog_Item {
      Id?: string;
      TextAudioT1?: data_mavendialog_Item_TextAudioT1;
      TextAudioT2?: data_mavendialog_Item_TextAudioT2;
      TextAudioT3?: data_mavendialog_Item_TextAudioT3;
      TextAudioT4?: data_mavendialog_Item_TextAudioT4;
      TextAudioT5?: data_mavendialog_Item_TextAudioT5;
      Unk006?: boolean;
      TextAudioT6?: any;
    }
    interface data_mavendialog_Item_TextAudioT1 {
      TableName?: string;
      Id?: string;
    }
    interface data_mavendialog_Item_TextAudioT2 {
      TableName?: string;
      Id?: string;
    }
    interface data_mavendialog_Item_TextAudioT3 {
      TableName?: string;
      Id?: string;
    }
    interface data_mavendialog_Item_TextAudioT4 {
      TableName?: string;
      Id?: string;
    }
    interface data_mavendialog_Item_TextAudioT5 {
      TableName?: string;
      Id?: string;
    }
    export interface data_mavendialog extends Array<data_mavendialog_Item> {}
    
    export type data_mavenfights = any[];
    
    interface data_mavenjewelradiuskeystones_Item {
      Keystone?: data_mavenjewelradiuskeystones_Item_Keystone;
    }
    interface data_mavenjewelradiuskeystones_Item_Keystone {
      TableName?: string;
      Id?: string;
    }
    export interface data_mavenjewelradiuskeystones extends Array<data_mavenjewelradiuskeystones_Item> {}
    
    interface data_melee_Item {
      ActiveSkill?: data_melee_Item_ActiveSkill;
      Unk001?: number;
      MiscAnimated?: any;
      MeleeTrailsKey1?: any;
      MeleeTrailsKey2?: any;
      MeleeTrailsKey3?: any;
      MeleeTrailsKey4?: any;
      MeleeTrailsKey5?: any;
      MeleeTrailsKey6?: any;
      MeleeTrailsKey7?: any;
      Unk010?: boolean;
      SurgeEffect_EPKFile?: string;
      Unk012?: string;
      Unk013?: string;
    }
    interface data_melee_Item_ActiveSkill {
      TableName?: string;
      Id?: string;
    }
    export interface data_melee extends Array<data_melee_Item> {}
    
    interface data_meleetrails_Item {
      EPKFile1?: string;
      Unk001?: number;
      EPKFile2?: string;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: boolean;
      AOFile?: string;
      Unk008?: boolean;
      Unk009?: string;
    }
    export interface data_meleetrails extends Array<data_meleetrails_Item> {}
    
    interface data_memorylinetype_Item {
      Id?: string;
      Unk001?: data_memorylinetype_Item_Unk001;
      Unk002?: number;
      Unk003?: number[];
      Unk004?: number[];
      Unk005?: number;
      Unk006?: number;
      Unk007?: data_memorylinetype_Item_Unk007;
      Unk008?: number;
      Suffix?: string;
      Unk010?: data_memorylinetype_Item_Unk010;
    }
    interface data_memorylinetype_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_memorylinetype_Item_Unk007 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_memorylinetype_Item_Unk010 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_memorylinetype extends Array<data_memorylinetype_Item> {}
    
    interface data_metamorphosisstashtablayout_Item {
      Id?: string;
      StoredItem?: data_metamorphosisstashtablayout_Item_StoredItem;
      XOffset?: number;
      YOffset?: number;
      FirstSlotIndex?: number;
      Width?: number;
      Height?: number;
      SlotSize?: number;
    }
    interface data_metamorphosisstashtablayout_Item_StoredItem {
      TableName?: string;
      Id?: string;
    }
    export interface data_metamorphosisstashtablayout extends Array<data_metamorphosisstashtablayout_Item> {}
    
    interface data_micromigrationdata_Item {
      BaseItemTypesKey?: data_micromigrationdata_Item_BaseItemTypesKey;
      Unk001?: number;
      Unk002?: data_micromigrationdata_Item_Unk002;
      Unk003?: data_micromigrationdata_Item_Unk003;
    }
    interface data_micromigrationdata_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    interface data_micromigrationdata_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_micromigrationdata_Item_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_micromigrationdata extends Array<data_micromigrationdata_Item> {}
    
    interface data_microtransactionappliedinventoryitemartvariations_Item {
      Unk000?: data_microtransactionappliedinventoryitemartvariations_Item_Unk000;
      DDSFiles?: string[];
      Unk002?: number[];
      Unk003?: number[];
      Unk004?: any[];
    }
    interface data_microtransactionappliedinventoryitemartvariations_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_microtransactionappliedinventoryitemartvariations extends Array<data_microtransactionappliedinventoryitemartvariations_Item> {}
    
    interface data_microtransactioncategory_Item {
      Id?: number;
      Name?: string;
    }
    export interface data_microtransactioncategory extends Array<data_microtransactioncategory_Item> {}
    
    interface data_microtransactioncharacterportraitvariations_Item {
      BaseItemType?: data_microtransactioncharacterportraitvariations_Item_BaseItemType;
    }
    interface data_microtransactioncharacterportraitvariations_Item_BaseItemType {
      TableName?: string;
      Id?: string;
    }
    export interface data_microtransactioncharacterportraitvariations extends Array<data_microtransactioncharacterportraitvariations_Item> {}
    
    interface data_microtransactionchargevariations_Item {
      Unk000?: data_microtransactionchargevariations_Item_Unk000;
      Unk001?: data_microtransactionchargevariations_Item_Unk001;
      Unk002?: data_microtransactionchargevariations_Item_Unk002;
      Unk003?: data_microtransactionchargevariations_Item_Unk003;
    }
    interface data_microtransactionchargevariations_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_microtransactionchargevariations_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_microtransactionchargevariations_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_microtransactionchargevariations_Item_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_microtransactionchargevariations extends Array<data_microtransactionchargevariations_Item> {}
    
    interface data_microtransactioncombineformula_Item {
      Id?: string;
      Result_BaseItemTypesKey?: data_microtransactioncombineformula_Item_Result_BaseItemTypesKey;
      Ingredients_BaseItemTypesKeys?: any[];
      BK2File?: string;
      Unk004?: any[];
      Unk005?: number;
      Unk006?: boolean;
    }
    interface data_microtransactioncombineformula_Item_Result_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_microtransactioncombineformula extends Array<data_microtransactioncombineformula_Item> {}
    
    interface data_microtransactionconditionalapparitionevents_Item {
      Unk000?: data_microtransactionconditionalapparitionevents_Item_Unk000;
      Unk001?: number;
      Unk002?: number;
      Unk003?: data_microtransactionconditionalapparitionevents_Item_Unk003;
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: number;
      Unk007?: any;
      Unk008?: any;
      Unk009?: number;
      Unk010?: number;
    }
    interface data_microtransactionconditionalapparitionevents_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_microtransactionconditionalapparitionevents_Item_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_microtransactionconditionalapparitionevents extends Array<data_microtransactionconditionalapparitionevents_Item> {}
    
    interface data_microtransactionconditionalapparitions_Item {
      Id?: string;
      Unk001?: number[];
      Unk002?: number[];
      Unk003?: data_microtransactionconditionalapparitions_Item_Unk003;
      Unk004?: data_microtransactionconditionalapparitions_Item_Unk004;
      Unk005?: number;
      Unk006?: boolean;
      Unk007?: number;
      Unk008?: boolean;
    }
    interface data_microtransactionconditionalapparitions_Item_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_microtransactionconditionalapparitions_Item_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_microtransactionconditionalapparitions extends Array<data_microtransactionconditionalapparitions_Item> {}
    
    export type data_microtransactioncounters = any[];
    
    export type data_microtransactioncursorvariations = any[];
    
    interface data_microtransactionequippediconvariations_Item {
      Unk000?: data_microtransactionequippediconvariations_Item_Unk000;
      DDSFiles?: string[];
      Unk002?: number[];
    }
    interface data_microtransactionequippediconvariations_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_microtransactionequippediconvariations extends Array<data_microtransactionequippediconvariations_Item> {}
    
    interface data_microtransactionfireworksvariations_Item {
      BaseItemTypesKey?: data_microtransactionfireworksvariations_Item_BaseItemTypesKey;
      AOFile?: string;
      Unk002?: boolean;
    }
    interface data_microtransactionfireworksvariations_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_microtransactionfireworksvariations extends Array<data_microtransactionfireworksvariations_Item> {}
    
    interface data_microtransactionjewelvariations_Item {
      Unk000?: data_microtransactionjewelvariations_Item_Unk000;
      Unk001?: number;
      Unk002?: string;
      Unk003?: string;
      Unk004?: number;
      Unk005?: number[];
      Unk006?: string;
      Unk007?: string;
      Unk008?: number;
      Unk009?: number;
      Unk010?: string;
      Unk011?: number;
      Unk012?: string;
      Unk013?: number;
      Unk014?: boolean;
      Unk015?: data_microtransactionjewelvariations_Item_Unk015;
      Unk016?: boolean;
    }
    interface data_microtransactionjewelvariations_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_microtransactionjewelvariations_Item_Unk015 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_microtransactionjewelvariations extends Array<data_microtransactionjewelvariations_Item> {}
    
    export type data_microtransactionlevelupeffects = any[];
    
    interface data_microtransactionobjecteffects_Item {
      Id?: string;
      Unk001?: number[];
      Script?: string;
      Unk003?: any[];
      Unk004?: any[];
      Unk005?: data_microtransactionobjecteffects_Item_Unk005;
      Unk006?: any[];
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: number;
    }
    interface data_microtransactionobjecteffects_Item_Unk005 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_microtransactionobjecteffects extends Array<data_microtransactionobjecteffects_Item> {}
    
    interface data_microtransactiononkillbeams_Item {
      Id?: string;
      Unk001?: data_microtransactiononkillbeams_Item_Unk001;
      Unk002?: string;
      Unk003?: string;
      Unk004?: string;
      Unk005?: boolean;
      Unk006?: data_microtransactiononkillbeams_Item_Unk006;
    }
    interface data_microtransactiononkillbeams_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_microtransactiononkillbeams_Item_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_microtransactiononkillbeams extends Array<data_microtransactiononkillbeams_Item> {}
    
    interface data_microtransactiononkillconditions_Item {
      Id?: string;
      Unk001?: number[];
      Unk002?: any[];
      Unk003?: any[];
      Unk004?: number;
      Unk005?: boolean;
      Unk006?: number[];
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: boolean;
      Unk011?: string;
      Unk012?: any[];
    }
    export interface data_microtransactiononkillconditions extends Array<data_microtransactiononkillconditions_Item> {}
    
    interface data_microtransactiononkilleffects_Item {
      Id?: string;
      Unk001?: any;
      Unk002?: data_microtransactiononkilleffects_Item_Unk002;
      Unk003?: data_microtransactiononkilleffects_Item_Unk003;
      Unk004?: number;
      Unk005?: any;
      Unk006?: number;
      Unk007?: any;
    }
    interface data_microtransactiononkilleffects_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_microtransactiononkilleffects_Item_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_microtransactiononkilleffects extends Array<data_microtransactiononkilleffects_Item> {}
    
    export type data_microtransactiononopenchesteffects = any[];
    
    interface data_microtransactionperiodiccharactereffectvariations_Item {
      Id?: string;
      AOFile?: string;
      MiscObject?: any;
      Unk003?: number;
    }
    export interface data_microtransactionperiodiccharactereffectvariations extends Array<data_microtransactionperiodiccharactereffectvariations_Item> {}
    
    export type data_microtransactionportalvariations = any[];
    
    interface data_microtransactionraritydisplay_Item {
      Rarity?: string;
      Unk001?: data_microtransactionraritydisplay_Item_Unk001;
      Unk002?: string;
      Unk003?: string;
    }
    interface data_microtransactionraritydisplay_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_microtransactionraritydisplay extends Array<data_microtransactionraritydisplay_Item> {}
    
    interface data_microtransactionrecycleoutcomes_Item {
      Unk000?: data_microtransactionrecycleoutcomes_Item_Unk000;
      Unk001?: number;
    }
    interface data_microtransactionrecycleoutcomes_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_microtransactionrecycleoutcomes extends Array<data_microtransactionrecycleoutcomes_Item> {}
    
    interface data_microtransactionrecyclesalvagevalues_Item {
      BaseItemType?: data_microtransactionrecyclesalvagevalues_Item_BaseItemType;
      Unk001?: number;
      Unk002?: number;
    }
    interface data_microtransactionrecyclesalvagevalues_Item_BaseItemType {
      TableName?: string;
      RowIndex?: number;
    }
    export interface data_microtransactionrecyclesalvagevalues extends Array<data_microtransactionrecyclesalvagevalues_Item> {}
    
    interface data_microtransactionskillgemeffectslottypes_Item {
      Id?: string;
      Type?: string;
      Unk002?: number;
    }
    export interface data_microtransactionskillgemeffectslottypes extends Array<data_microtransactionskillgemeffectslottypes_Item> {}
    
    interface data_microtransactionslot_Item {
      Id?: number;
      Unk001?: data_microtransactionslot_Item_Unk001;
      Name?: string;
      Unk003?: data_microtransactionslot_Item_Unk003;
      Unk004?: number;
      Unk005?: boolean;
      Unk006?: number;
      Unk007?: number;
      Unk008?: boolean;
    }
    interface data_microtransactionslot_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_microtransactionslot_Item_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_microtransactionslot extends Array<data_microtransactionslot_Item> {}
    
    interface data_microtransactionslotadditionaldefaultoptions_Item {
      Unk000?: number;
      Unk001?: number;
      Unk002?: string;
      Unk003?: string;
    }
    export interface data_microtransactionslotadditionaldefaultoptions extends Array<data_microtransactionslotadditionaldefaultoptions_Item> {}
    
    export type data_microtransactionsocialframevariations = any[];
    
    interface data_minimapicons_Item {
      Id?: string;
      MinimapIconRadius?: number;
      LargemapIconRadius?: number;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: boolean;
      MinimapIconPointerMaxDistance?: number;
      Unk007?: number;
    }
    export interface data_minimapicons extends Array<data_minimapicons_Item> {}
    
    export type data_minioncommands = any[];
    
    export type data_miniongemlevelscaling = any[];
    
    export type data_minionstats = any[];
    
    interface data_miniontype_Item {
      Id?: string;
      Unk001?: any;
      Unk002?: data_miniontype_Item_Unk002;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: boolean;
      Unk007?: boolean;
      Unk008?: boolean;
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: boolean;
    }
    interface data_miniontype_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_miniontype extends Array<data_miniontype_Item> {}
    
    interface data_miniqueststates_Item {
      Unk000?: number;
      Unk001?: any[];
      Unk002?: number[];
      Unk003?: number;
    }
    export interface data_miniqueststates extends Array<data_miniqueststates_Item> {}
    
    interface data_miscanimated_Item {
      Id?: string;
      AOFile?: string;
      PreloadGroupsKeys?: any[];
      Unk003?: number;
      Unk004?: number;
      HASH32?: number;
    }
    export interface data_miscanimated extends Array<data_miscanimated_Item> {}
    
    interface data_miscanimatedartvariations_Item {
      Id?: string;
      Unk001?: number[];
      Unk002?: number;
      Unk003?: number;
      Unk004?: any;
    }
    export interface data_miscanimatedartvariations extends Array<data_miscanimatedartvariations_Item> {}
    
    interface data_miscbeams_Item {
      Id?: string;
      MiscAnimated?: data_miscbeams_Item_MiscAnimated;
      Unk002?: number;
      PreloadGroupsKeys?: any[];
      Unk004?: number;
    }
    interface data_miscbeams_Item_MiscAnimated {
      TableName?: string;
      Id?: string;
    }
    export interface data_miscbeams extends Array<data_miscbeams_Item> {}
    
    interface data_miscbeamsartvariations_Item {
      Id?: string;
      Unk001?: number[];
      Unk002?: number;
      Unk003?: number;
      Unk004?: any;
    }
    export interface data_miscbeamsartvariations extends Array<data_miscbeamsartvariations_Item> {}
    
    export type data_misccooldowns = any[];
    
    interface data_misceffectpacks_Item {
      Id?: string;
      EPKFile?: string;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      PreloadGroups?: any[];
      Unk006?: boolean;
      PlayerOnly_EPKFile?: string;
      Unk008?: boolean;
    }
    export interface data_misceffectpacks extends Array<data_misceffectpacks_Item> {}
    
    interface data_misceffectpacksartvariations_Item {
      Unk000?: string;
      Unk001?: number[];
      Unk002?: number;
    }
    export interface data_misceffectpacksartvariations extends Array<data_misceffectpacksartvariations_Item> {}
    
    interface data_miscobjects_Item {
      Id?: string;
      EffectVirtualPath?: string;
      PreloadGroupsKeys?: any[];
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
    }
    export interface data_miscobjects extends Array<data_miscobjects_Item> {}
    
    interface data_miscobjectsartvariations_Item {
      Unk000?: string;
      Unk001?: number[];
      Unk002?: number;
      Unk003?: number;
      Unk004?: any;
    }
    export interface data_miscobjectsartvariations extends Array<data_miscobjectsartvariations_Item> {}
    
    export type data_miscprojectilemod = any[];
    
    export type data_miscprojectilemodartvariations = any[];
    
    export type data_missiontilemap = any[];
    
    interface data_missiontimertypes_Item {
      Id?: string;
      Image?: string;
      BackgroundImage?: string;
      Unk003?: any[];
      Unk004?: any[];
      Unk005?: any;
      Unk006?: any;
    }
    export interface data_missiontimertypes extends Array<data_missiontimertypes_Item> {}
    
    export type data_missiontransitiontiles = any[];
    
    export type data_mobileactoneatlasquestprogression = any[];
    
    export type data_mobileascendancythresholds = any[];
    
    export type data_mobileatlaseldermemories = any[];
    
    export type data_mobileatlasinventorylayout = any[];
    
    export type data_mobilecharactercreation = any[];
    
    export type data_mobilequestaudio = any[];
    
    export type data_mobileskillgemlayout = any[];
    
    export type data_mobileskillgemlayoutpages = any[];
    
    export type data_mobiletutorial = any[];
    
    export type data_mobiletutorialgroup = any[];
    
    export type data_modeffectstats = any[];
    
    interface data_modequivalencies_Item {
      Id?: string;
      ModsKey0?: data_modequivalencies_Item_ModsKey0;
      ModsKey1?: data_modequivalencies_Item_ModsKey1;
      ModsKey2?: data_modequivalencies_Item_ModsKey2;
      Unk004?: boolean;
    }
    interface data_modequivalencies_Item_ModsKey0 {
      TableName?: string;
      Id?: string;
    }
    interface data_modequivalencies_Item_ModsKey1 {
      TableName?: string;
      Id?: string;
    }
    interface data_modequivalencies_Item_ModsKey2 {
      TableName?: string;
      Id?: string;
    }
    export interface data_modequivalencies extends Array<data_modequivalencies_Item> {}
    
    interface data_modfamily_Item {
      Id?: string;
    }
    export interface data_modfamily extends Array<data_modfamily_Item> {}
    
    export type data_modgrantedskills = any[];
    
    interface data_mods_Item {
      Id?: string;
      HASH16?: number;
      ModTypeKey?: data_mods_Item_ModTypeKey;
      Level?: number;
      StatsKey1?: data_mods_Item_StatsKey1;
      StatsKey2?: any;
      StatsKey3?: any;
      StatsKey4?: any;
      Domain?: number;
      Name?: string;
      GenerationType?: number;
      Families?: any[];
      Stat1Min?: number;
      Stat1Max?: number;
      Stat2Min?: number;
      Stat2Max?: number;
      Stat3Min?: number;
      Stat3Max?: number;
      Stat4Min?: number;
      Stat4Max?: number;
      SpawnWeight_TagsKeys?: any[];
      SpawnWeight_Values?: any[];
      TagsKeys?: any[];
      GrantedEffectsPerLevelKeys?: any[];
      Unk024?: any[];
      MonsterMetadata?: string;
      MonsterKillAchievements?: any[];
      ChestModType?: any[];
      Stat5Min?: number;
      Stat5Max?: number;
      StatsKey5?: any;
      FullAreaClear_AchievementItemsKey?: any[];
      AchievementItemsKey?: any[];
      GenerationWeight_TagsKeys?: any[];
      GenerationWeight_Values?: any[];
      ModifyMapsAchievements?: any[];
      IsEssenceOnlyModifier?: boolean;
      Stat6Min?: number;
      Stat6Max?: number;
      StatsKey6?: any;
      MaxLevel?: number;
      Unk041?: boolean;
      CraftingItemClassRestrictions?: any[];
      MonsterOnDeath?: string;
      Unk044?: number;
      Unk045?: any[];
      Heist_SubStatValue1?: number;
      Heist_SubStatValue2?: number;
      Heist_StatsKey0?: any;
      Heist_StatsKey1?: any;
      Heist_AddStatValue1?: number;
      Heist_AddStatValue2?: number;
      InfluenceTypes?: number;
      ImplicitTagsKeys?: any[];
      Unk054?: boolean;
      Unk055?: number;
      Unk056?: number;
      Unk057?: number;
      Unk058?: number;
      Unk059?: number;
      Unk060?: number;
      Unk061?: number;
      Unk062?: number;
      Unk063?: number;
      Unk064?: number;
      Unk065?: number;
      Unk066?: number;
      Unk067?: number;
      Unk068?: number;
      Unk069?: number;
      Unk070?: number;
      BuffTemplate?: any;
      ArchnemesisMinionMod?: any;
      HASH32?: number;
      Unk074?: any[];
      Unk075?: number;
      Unk076?: any[];
    }
    interface data_mods_Item_ModTypeKey {
      TableName?: string;
      RowIndex?: number;
    }
    interface data_mods_Item_StatsKey1 {
      TableName?: string;
      Id?: string;
    }
    export interface data_mods extends Array<data_mods_Item> {}
    
    interface data_modsellpricetypes_Item {
      Id?: string;
    }
    export interface data_modsellpricetypes extends Array<data_modsellpricetypes_Item> {}
    
    interface data_modtype_Item {
      Name?: string;
      ModSellPriceTypesKeys?: any[];
      Unk002?: boolean;
    }
    export interface data_modtype extends Array<data_modtype_Item> {}
    
    interface data_monsterarmours_Item {
      Id?: string;
      ArtString_SMFile?: string;
    }
    export interface data_monsterarmours extends Array<data_monsterarmours_Item> {}
    
    export type data_monsterbonuses = any[];
    
    interface data_monsterconditionaleffectpacks_Item {
      Id?: string;
      MiscEffectPack1?: any[];
      MiscEffectPack2?: any[];
      MiscEffectPack3?: any[];
      MiscEffectPack4?: any[];
      Unk005?: number;
    }
    export interface data_monsterconditionaleffectpacks extends Array<data_monsterconditionaleffectpacks_Item> {}
    
    interface data_monsterconditions_Item {
      Id?: string;
      Unk001?: data_monsterconditions_Item_Unk001;
      Unk002?: any;
      Unk003?: any;
      Unk004?: any[];
      Unk005?: boolean;
      Unk006?: boolean;
      Unk007?: any[];
      Unk008?: any[];
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
    }
    interface data_monsterconditions_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_monsterconditions extends Array<data_monsterconditions_Item> {}
    
    export type data_monsterdeathachievements = any[];
    
    interface data_monsterdeathconditions_Item {
      Unk000?: string;
      Unk001?: any[];
      Unk002?: boolean;
      Unk003?: number;
      Unk004?: any[];
      Unk005?: boolean;
      Unk006?: number;
      Unk007?: data_monsterdeathconditions_Item_Unk007;
      Unk008?: boolean;
      Unk009?: any[];
      Unk010?: number;
      Unk011?: boolean;
      Unk012?: any[];
      Unk013?: number;
      Unk014?: any;
      Unk015?: any;
      Unk016?: number;
      Unk017?: number;
    }
    interface data_monsterdeathconditions_Item_Unk007 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_monsterdeathconditions extends Array<data_monsterdeathconditions_Item> {}
    
    export type data_monsterencounterskillgroups = any[];
    
    interface data_monstergroupentries_Item {
      Id?: string;
      MonsterVarietiesKey?: data_monstergroupentries_Item_MonsterVarietiesKey;
      MonsterGroupNamesId?: number;
    }
    interface data_monstergroupentries_Item_MonsterVarietiesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_monstergroupentries extends Array<data_monstergroupentries_Item> {}
    
    interface data_monsterheightbrackets_Item {
      Id?: string;
      Unk001?: number;
      BuffVisuals1?: data_monsterheightbrackets_Item_BuffVisuals1;
      BuffVisuals2?: data_monsterheightbrackets_Item_BuffVisuals2;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Tag?: data_monsterheightbrackets_Item_Tag;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
    }
    interface data_monsterheightbrackets_Item_BuffVisuals1 {
      TableName?: string;
      Id?: string;
    }
    interface data_monsterheightbrackets_Item_BuffVisuals2 {
      TableName?: string;
      Id?: string;
    }
    interface data_monsterheightbrackets_Item_Tag {
      TableName?: string;
      Id?: string;
    }
    export interface data_monsterheightbrackets extends Array<data_monsterheightbrackets_Item> {}
    
    interface data_monsterheights_Item {
      MonsterVariety?: data_monsterheights_Item_MonsterVariety;
      Unk001?: number;
      MonsterHeightBracket?: data_monsterheights_Item_MonsterHeightBracket;
      Unk003?: number;
      Unk004?: number;
    }
    interface data_monsterheights_Item_MonsterVariety {
      TableName?: string;
      Id?: string;
    }
    interface data_monsterheights_Item_MonsterHeightBracket {
      TableName?: string;
      Id?: string;
    }
    export interface data_monsterheights extends Array<data_monsterheights_Item> {}
    
    interface data_monstermapbossdifficulty_Item {
      MapLevel?: number;
      Stat1Value?: number;
      Stat2Value?: number;
      StatsKey1?: data_monstermapbossdifficulty_Item_StatsKey1;
      StatsKey2?: data_monstermapbossdifficulty_Item_StatsKey2;
      StatsKey3?: data_monstermapbossdifficulty_Item_StatsKey3;
      Stat3Value?: number;
      StatsKey4?: data_monstermapbossdifficulty_Item_StatsKey4;
      Stat4Value?: number;
      StatsKey5?: data_monstermapbossdifficulty_Item_StatsKey5;
      Stat5Value?: number;
    }
    interface data_monstermapbossdifficulty_Item_StatsKey1 {
      TableName?: string;
      Id?: string;
    }
    interface data_monstermapbossdifficulty_Item_StatsKey2 {
      TableName?: string;
      Id?: string;
    }
    interface data_monstermapbossdifficulty_Item_StatsKey3 {
      TableName?: string;
      Id?: string;
    }
    interface data_monstermapbossdifficulty_Item_StatsKey4 {
      TableName?: string;
      Id?: string;
    }
    interface data_monstermapbossdifficulty_Item_StatsKey5 {
      TableName?: string;
      Id?: string;
    }
    export interface data_monstermapbossdifficulty extends Array<data_monstermapbossdifficulty_Item> {}
    
    interface data_monstermapdifficulty_Item {
      MapLevel?: number;
      Stat1Value?: number;
      Stat2Value?: number;
      StatsKey1?: data_monstermapdifficulty_Item_StatsKey1;
      StatsKey2?: data_monstermapdifficulty_Item_StatsKey2;
      StatsKey3?: any;
      Stat3Value?: number;
      StatsKey4?: any;
      Stat4Value?: number;
    }
    interface data_monstermapdifficulty_Item_StatsKey1 {
      TableName?: string;
      Id?: string;
    }
    interface data_monstermapdifficulty_Item_StatsKey2 {
      TableName?: string;
      Id?: string;
    }
    export interface data_monstermapdifficulty extends Array<data_monstermapdifficulty_Item> {}
    
    interface data_monstermortar_Item {
      Id?: number;
      Unk001?: data_monstermortar_Item_Unk001;
      Unk002?: data_monstermortar_Item_Unk002;
      Unk003?: data_monstermortar_Item_Unk003;
      Unk004?: number;
      Unk005?: boolean;
      Unk006?: boolean;
      Unk007?: boolean;
      Unk008?: boolean;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: boolean;
      Unk013?: number;
      Unk014?: boolean;
      Unk015?: boolean;
      Unk016?: any;
      Unk017?: number;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
      Unk021?: boolean;
      Unk022?: any;
      Unk023?: string;
    }
    interface data_monstermortar_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_monstermortar_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_monstermortar_Item_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_monstermortar extends Array<data_monstermortar_Item> {}
    
    export type data_monsterpackcounts = any[];
    
    export type data_monsterpackentries = any[];
    
    interface data_monsterpacks_Item {
      Id?: string;
      Unk001?: number;
      WorldAreasKeys?: any[];
      Unk003?: number;
      Unk004?: number;
      BossMonsterSpawnChance?: number;
      BossMonsterCount?: number;
      BossMonster_MonsterVarietiesKeys?: any[];
      Unk008?: boolean;
      Unk009?: any[];
      Unk010?: any[];
      TagsKeys?: any[];
      MinLevel?: number;
      MaxLevel?: number;
      WorldAreas2?: any[];
      Unk015?: number;
      PackFormation?: any;
      Unk017?: number;
      Unk018?: boolean;
      Unk019?: any[];
      Unk020?: boolean;
      Unk021?: boolean;
      Unk022?: boolean;
      Unk023?: boolean;
      Unk024?: any[];
      NecropolisPack?: data_monsterpacks_Item_NecropolisPack;
    }
    interface data_monsterpacks_Item_NecropolisPack {
      TableName?: string;
      RowIndex?: number;
    }
    export interface data_monsterpacks extends Array<data_monsterpacks_Item> {}
    
    interface data_monsterprojectileattack_Item {
      Id?: number;
      Projectile?: data_monsterprojectileattack_Item_Projectile;
      Unk002?: boolean;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: number;
    }
    interface data_monsterprojectileattack_Item_Projectile {
      TableName?: string;
      Id?: string;
    }
    export interface data_monsterprojectileattack extends Array<data_monsterprojectileattack_Item> {}
    
    interface data_monsterprojectilespell_Item {
      Id?: number;
      Projectile?: data_monsterprojectilespell_Item_Projectile;
      Animation?: data_monsterprojectilespell_Item_Animation;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: boolean;
    }
    interface data_monsterprojectilespell_Item_Projectile {
      TableName?: string;
      Id?: string;
    }
    interface data_monsterprojectilespell_Item_Animation {
      TableName?: string;
      Id?: string;
    }
    export interface data_monsterprojectilespell extends Array<data_monsterprojectilespell_Item> {}
    
    interface data_monsterresistances_Item {
      Id?: string;
      FireNormal?: number;
      ColdNormal?: number;
      LightningNormal?: number;
      ChaosNormal?: number;
      FireCruel?: number;
      ColdCruel?: number;
      LightningCruel?: number;
      ChaosCruel?: number;
      FireMerciless?: number;
      ColdMerciless?: number;
      LightningMerciless?: number;
      ChaosMerciless?: number;
    }
    export interface data_monsterresistances extends Array<data_monsterresistances_Item> {}
    
    interface data_monstersegments_Item {
      Id?: string;
      Shapes?: string;
    }
    export interface data_monstersegments extends Array<data_monstersegments_Item> {}
    
    export type data_monstershapeshift = any[];
    
    interface data_monsterspawnergroups_Item {
      Id?: string;
    }
    export interface data_monsterspawnergroups extends Array<data_monsterspawnergroups_Item> {}
    
    interface data_monsterspawnergroupsperlevel_Item {
      MonsterSpawnerGroupsKey?: data_monsterspawnergroupsperlevel_Item_MonsterSpawnerGroupsKey;
      MinLevel?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
    }
    interface data_monsterspawnergroupsperlevel_Item_MonsterSpawnerGroupsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_monsterspawnergroupsperlevel extends Array<data_monsterspawnergroupsperlevel_Item> {}
    
    export type data_monsterspawneroverrides = any[];
    
    interface data_monstertypes_Item {
      Id?: string;
      Unk001?: number;
      IsSummoned?: boolean;
      Armour?: number;
      Evasion?: number;
      EnergyShieldFromLife?: number;
      DamageSpread?: number;
      MonsterResistancesKey?: data_monstertypes_Item_MonsterResistancesKey;
      IsLargeAbyssMonster?: boolean;
      IsSmallAbyssMonster?: boolean;
      Unk010?: boolean;
    }
    interface data_monstertypes_Item_MonsterResistancesKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface data_monstertypes extends Array<data_monstertypes_Item> {}
    
    interface data_monstervarieties_Item {
      Id?: string;
      MonsterTypesKey?: data_monstervarieties_Item_MonsterTypesKey;
      Unk002?: number;
      ObjectSize?: number;
      MinimumAttackDistance?: number;
      MaximumAttackDistance?: number;
      ACTFiles?: any[];
      AOFiles?: any[];
      BaseMonsterTypeIndex?: string;
      ModsKeys?: any[];
      Unk010?: number;
      Unk011?: string;
      Unk012?: string;
      ModelSizeMultiplier?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: number;
      Unk017?: number;
      Unk018?: number;
      TagsKeys?: any[];
      ExperienceMultiplier?: number;
      Unk021?: number;
      Unk022?: number;
      Unk023?: number;
      Unk024?: number;
      CriticalStrikeChance?: number;
      Unk026?: number;
      GrantedEffectsKeys?: any[];
      AISFile?: string;
      ModsKeys2?: any[];
      Stance?: string;
      Unk031?: data_monstervarieties_Item_Unk031;
      Name?: string;
      DamageMultiplier?: number;
      LifeMultiplier?: number;
      AttackSpeed?: number;
      Weapon1_ItemVisualIdentityKeys?: any[];
      Weapon2_ItemVisualIdentityKeys?: any[];
      Back_ItemVisualIdentityKey?: data_monstervarieties_Item_Back_ItemVisualIdentityKey;
      MainHand_ItemClassesKey?: data_monstervarieties_Item_MainHand_ItemClassesKey;
      OffHand_ItemClassesKey?: any;
      Helmet_ItemVisualIdentityKey?: any;
      Unk042?: number;
      KillSpecificMonsterCount_AchievementItemsKeys?: any;
      Special_ModsKeys?: any[];
      Unk046?: boolean;
      Unk047?: number;
      Unk048?: number;
      Unk049?: number;
      Unk050?: number;
      Unk051?: number;
      Unk052?: number;
      HASH16?: number;
      Unk054?: boolean;
      Unk055?: any;
      KillWhileOnslaughtIsActive_AchievementItemsKey?: data_monstervarieties_Item_KillWhileOnslaughtIsActive_AchievementItemsKey;
      MonsterSegmentsKey?: data_monstervarieties_Item_MonsterSegmentsKey;
      MonsterArmoursKey?: any;
      KillWhileTalismanIsActive_AchievementItemsKey?: any;
      Part1_ModsKeys?: any;
      Part2_ModsKeys?: any[];
      Endgame_ModsKeys?: any[];
      Unk063?: data_monstervarieties_Item_Unk063;
      Unk064?: number;
      Unk065?: number;
      Unk066?: any;
      Unk067?: any[];
      Unk068?: number;
      SinkAnimation_AOFile?: string;
      Unk070?: boolean;
      Unk071?: any[];
      Unk072?: boolean;
      Unk073?: boolean;
      Unk074?: boolean;
      Unk075?: number;
      Unk076?: number;
      Unk077?: number;
      Unk078?: number;
      EPKFile?: any;
      Unk080?: number;
      MonsterConditionalEffectPacksKey?: data_monstervarieties_Item_MonsterConditionalEffectPacksKey;
      Unk082?: boolean;
      Unk083?: boolean;
      Unk084?: number;
      Unk085?: boolean;
      Unk086?: number;
      Unk087?: number;
      Unk088?: number;
      Unk089?: number;
      Unk090?: number;
      Unk091?: number;
      AddonMonsterTypeIndex?: any[];
      Unk093?: number;
      Unk094?: number;
      Unk095?: number;
      Unk096?: number;
      Unk097?: number;
      Unk098?: boolean;
      BossHealthBar?: boolean;
      Unk100?: boolean;
    }
    interface data_monstervarieties_Item_MonsterTypesKey {
      TableName?: string;
      Id?: string;
    }
    interface data_monstervarieties_Item_Unk031 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_monstervarieties_Item_Back_ItemVisualIdentityKey {
      TableName?: string;
      Id?: string;
    }
    interface data_monstervarieties_Item_MainHand_ItemClassesKey {
      TableName?: string;
      RowIndex?: number;
    }
    interface data_monstervarieties_Item_KillWhileOnslaughtIsActive_AchievementItemsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_monstervarieties_Item_MonsterSegmentsKey {
      TableName?: string;
      RowIndex?: number;
    }
    interface data_monstervarieties_Item_Unk063 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_monstervarieties_Item_MonsterConditionalEffectPacksKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_monstervarieties extends Array<data_monstervarieties_Item> {}
    
    interface data_monstervarietiesartvariations_Item {
      Id?: string;
      Unk001?: number;
      Unk002?: number[];
    }
    export interface data_monstervarietiesartvariations extends Array<data_monstervarietiesartvariations_Item> {}
    
    interface data_mousecursorsizesettings_Item {
      Size?: string;
      Description?: string;
      Ratio?: number;
    }
    export interface data_mousecursorsizesettings extends Array<data_mousecursorsizesettings_Item> {}
    
    interface data_movedaemon_Item {
      Unk000?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: data_movedaemon_Item_Unk006;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: boolean;
      Unk017?: boolean;
      Unk018?: boolean;
      Unk019?: number;
      Unk020?: number;
      Unk021?: number;
      Unk022?: number;
      Unk023?: number;
      Unk024?: number;
      Unk025?: boolean;
      Unk026?: any;
      Unk027?: number;
      Unk028?: boolean;
      Unk029?: boolean;
      Unk030?: number;
      Unk031?: number;
      Unk032?: boolean;
    }
    interface data_movedaemon_Item_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_movedaemon extends Array<data_movedaemon_Item> {}
    
    interface data_mtxsetbonus_Item {
      Id?: string;
      Unk001?: data_mtxsetbonus_Item_Unk001;
      Unk002?: any[];
      Unk003?: any[];
      Unk004?: any[];
      Unk005?: any[];
    }
    interface data_mtxsetbonus_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_mtxsetbonus extends Array<data_mtxsetbonus_Item> {}
    
    interface data_multipartachievementareas_Item {
      Unk000?: data_multipartachievementareas_Item_Unk000;
      Unk001?: any[];
      Unk002?: number;
    }
    interface data_multipartachievementareas_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_multipartachievementareas extends Array<data_multipartachievementareas_Item> {}
    
    interface data_multipartachievementconditions_Item {
      Id?: string;
      MultiPartAchievementsKey1?: any;
      MultiPartAchievementsKey2?: data_multipartachievementconditions_Item_MultiPartAchievementsKey2;
      Unk003?: number;
      Unk004?: number;
    }
    interface data_multipartachievementconditions_Item_MultiPartAchievementsKey2 {
      TableName?: string;
      Id?: string;
    }
    export interface data_multipartachievementconditions extends Array<data_multipartachievementconditions_Item> {}
    
    interface data_multipartachievements_Item {
      Id?: string;
      Unk001?: number;
      AchievementItemsKey?: data_multipartachievements_Item_AchievementItemsKey;
      Unk003?: number;
      Unk004?: boolean;
      Unk005?: boolean;
      Unk006?: number;
    }
    interface data_multipartachievements_Item_AchievementItemsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_multipartachievements extends Array<data_multipartachievements_Item> {}
    
    interface data_music_Item {
      Id?: string;
      SoundFile?: string;
      BankFile?: string;
      HASH16?: number;
      IsAvailableInHideout?: boolean;
      Name?: string;
      Unk006?: string;
      MusicCategories?: any[];
      Unk008?: boolean;
      Unk009?: number;
    }
    export interface data_music extends Array<data_music_Item> {}
    
    interface data_musiccategories_Item {
      Id?: string;
      Name?: string;
      Order?: number;
      Unk003?: boolean;
    }
    export interface data_musiccategories extends Array<data_musiccategories_Item> {}
    
    interface data_mysteryboxes_Item {
      BaseItemTypesKey?: data_mysteryboxes_Item_BaseItemTypesKey;
      BK2File?: string;
      BoxId?: string;
      BundleId?: string;
      Unk004?: boolean;
    }
    interface data_mysteryboxes_Item_BaseItemTypesKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface data_mysteryboxes extends Array<data_mysteryboxes_Item> {}
    
    interface data_nearbymonsterconditions_Item {
      Id?: string;
      MonsterVarietiesKeys?: any[];
      MonsterAmount?: number;
      Unk003?: number;
      IsNegated?: boolean;
      Unk005?: number;
      Unk006?: any[];
      IsLessThen?: boolean;
      MinimumHealthPercentage?: number;
    }
    export interface data_nearbymonsterconditions extends Array<data_nearbymonsterconditions_Item> {}
    
    interface data_nettiers_Item {
      BaseItemTypesKey?: data_nettiers_Item_BaseItemTypesKey;
      Tier?: number;
    }
    interface data_nettiers_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_nettiers extends Array<data_nettiers_Item> {}
    
    interface data_notifications_Item {
      Id?: string;
      Unk001?: boolean;
      Unk002?: boolean;
      Message?: string;
      Unk004?: string;
      Unk005?: number;
      Unk006?: boolean;
      Unk007?: boolean;
    }
    export interface data_notifications extends Array<data_notifications_Item> {}
    
    interface data_npcaudio_Item {
      Id?: string;
      Unk001?: number[];
      Unk002?: any[];
      VolumePercentage?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: data_npcaudio_Item_Unk008;
      Unk009?: number;
      Unk010?: number;
    }
    interface data_npcaudio_Item_Unk008 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_npcaudio extends Array<data_npcaudio_Item> {}
    
    interface data_npcconversations_Item {
      Id?: string;
      DialogueEvent?: data_npcconversations_Item_DialogueEvent;
      NPCTextAudioKeys?: any[];
      Unk003?: number[];
      Unk004?: number;
    }
    interface data_npcconversations_Item_DialogueEvent {
      TableName?: string;
      Id?: string;
    }
    export interface data_npcconversations extends Array<data_npcconversations_Item> {}
    
    export type data_npcdialoguecutscene = any[];
    
    export type data_npcdialoguecutscenesequences = any[];
    
    interface data_npcdialoguestyles_Item {
      Id?: string;
      HeaderBaseFile?: string;
      ButtomFile?: string;
      BannerFiles?: any[];
      HeaderFiles?: any[];
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: any[];
      Unk011?: data_npcdialoguestyles_Item_Unk011;
      Unk012?: string;
      Unk013?: any[];
      Unk014?: any[];
      Unk015?: number;
      Unk016?: number;
      Unk017?: number;
      Unk018?: string;
      Unk019?: string;
      Unk020?: number;
      Unk021?: number;
    }
    interface data_npcdialoguestyles_Item_Unk011 {
      TableName?: string;
      Id?: string;
    }
    export interface data_npcdialoguestyles extends Array<data_npcdialoguestyles_Item> {}
    
    interface data_npcfollowervariations_Item {
      MonsterVarietiesKey?: data_npcfollowervariations_Item_MonsterVarietiesKey;
      MiscAnimatedKey0?: data_npcfollowervariations_Item_MiscAnimatedKey0;
      MiscAnimatedKey1?: data_npcfollowervariations_Item_MiscAnimatedKey1;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: any[];
      Unk012?: any[];
      Unk013?: number;
      Unk014?: boolean;
      Unk015?: boolean;
      Unk016?: number;
    }
    interface data_npcfollowervariations_Item_MonsterVarietiesKey {
      TableName?: string;
      Id?: string;
    }
    interface data_npcfollowervariations_Item_MiscAnimatedKey0 {
      TableName?: string;
      Id?: string;
    }
    interface data_npcfollowervariations_Item_MiscAnimatedKey1 {
      TableName?: string;
      Id?: string;
    }
    export interface data_npcfollowervariations extends Array<data_npcfollowervariations_Item> {}
    
    export type data_npcmaster = any[];
    
    export type data_npcportraitaooverrides = any[];
    
    interface data_npcportraits_Item {
      Name?: string;
      PortraitFile?: string;
      Unk002?: number;
      Unk003?: number;
    }
    export interface data_npcportraits extends Array<data_npcportraits_Item> {}
    
    interface data_npcs_Item {
      Id?: string;
      Name?: string;
      Metadata?: string;
      Unk003?: any;
      NPCMasterKey?: any;
      ShortName?: string;
      Unk006?: number;
      NPCAudios1?: any[];
      NPCAudios2?: any[];
      HASH16?: number;
      Unk010?: any;
      Portrait?: any;
      DialogueStyle?: any;
      Unk013?: boolean;
      Unk014?: any;
      Gender?: any;
      Unk016?: boolean;
    }
    export interface data_npcs extends Array<data_npcs_Item> {}
    
    interface data_npcshop_Item {
      Id?: string;
      Unk001?: number;
      Unk002?: any[];
    }
    export interface data_npcshop extends Array<data_npcshop_Item> {}
    
    export type data_npcshopgamblervisualidentity = any[];
    
    export type data_npcshops = any[];
    
    interface data_npctalk_Item {
      NPCKey?: data_npctalk_Item_NPCKey;
      Unk001?: number;
      DialogueOption?: string;
      Unk003?: any[];
      Unk004?: any[];
      Unk005?: number[];
      Script?: string;
      TextAudio?: data_npctalk_Item_TextAudio;
      Category?: data_npctalk_Item_Category;
      QuestRewardOffersKey?: any;
      QuestFlag?: data_npctalk_Item_QuestFlag;
      NPCTextAudioKeys?: any[];
      Script2?: string;
      Unk013?: boolean;
      Unk014?: boolean;
      Unk015?: number[];
      Unk016?: any[];
      Unk017?: number;
      Unk018?: any[];
      Unk019?: number;
      Unk020?: boolean;
      Unk021?: any;
      Unk022?: number;
      Unk023?: boolean;
      DialogueOption2?: any;
      Unk025?: data_npctalk_Item_Unk025;
      Unk026?: any;
      Unk027?: any;
      Unk028?: number;
      Unk029?: number;
      Unk030?: number;
      Unk031?: number;
      Unk032?: data_npctalk_Item_Unk032;
      Unk033?: number;
      Unk034?: any;
      Unk035?: boolean;
      Unk036?: number;
      Unk037?: data_npctalk_Item_Unk037;
    }
    interface data_npctalk_Item_NPCKey {
      TableName?: string;
      Id?: string;
    }
    interface data_npctalk_Item_TextAudio {
      TableName?: string;
      Id?: string;
    }
    interface data_npctalk_Item_Category {
      TableName?: string;
      Id?: string;
    }
    interface data_npctalk_Item_QuestFlag {
      TableName?: string;
      Id?: string;
    }
    interface data_npctalk_Item_Unk025 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_npctalk_Item_Unk032 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_npctalk_Item_Unk037 {
      TableName?: string;
      RowIndex?: number;
    }
    export interface data_npctalk extends Array<data_npctalk_Item> {}
    
    interface data_npctalkcategory_Item {
      Id?: string;
      Unk001?: boolean;
    }
    export interface data_npctalkcategory extends Array<data_npctalkcategory_Item> {}
    
    interface data_npctalkconsolequickactions_Item {
      Id?: string;
      Controller?: string;
      Unk002?: string;
    }
    export interface data_npctalkconsolequickactions extends Array<data_npctalkconsolequickactions_Item> {}
    
    export type data_npctalkmobilegroup = any[];
    
    export type data_npctype = any[];
    
    export type data_npcvendordialogue = any[];
    
    export type data_npcvendordialogueconditions = any[];
    
    export type data_ongoingbuffvariations = any[];
    
    export type data_ongoingtriggervariations = any[];
    
    export type data_onkillachievements = any[];
    
    interface data_packformation_Item {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
    }
    export interface data_packformation extends Array<data_packformation_Item> {}
    
    export type data_pantheonpanellayout = any[];
    
    export type data_pantheonsouls = any[];
    
    interface data_passivejewelart_Item {
      Unk000?: data_passivejewelart_Item_Unk000;
      Unk001?: string;
      Unk002?: string;
      Unk003?: any;
    }
    interface data_passivejewelart_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_passivejewelart extends Array<data_passivejewelart_Item> {}
    
    interface data_passivejewelnodemodifyingstats_Item {
      JwelStat?: data_passivejewelnodemodifyingstats_Item_JwelStat;
      Stat?: data_passivejewelnodemodifyingstats_Item_Stat;
      Unk002?: boolean;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: boolean;
    }
    interface data_passivejewelnodemodifyingstats_Item_JwelStat {
      TableName?: string;
      Id?: string;
    }
    interface data_passivejewelnodemodifyingstats_Item_Stat {
      TableName?: string;
      Id?: string;
    }
    export interface data_passivejewelnodemodifyingstats extends Array<data_passivejewelnodemodifyingstats_Item> {}
    
    interface data_passivejewelradii_Item {
      ID?: string;
      RingOuterRadius?: number;
      RingInnerRadius?: number;
      Radius?: number;
    }
    export interface data_passivejewelradii extends Array<data_passivejewelradii_Item> {}
    
    export type data_passivejewelslots = any[];
    
    export type data_passivejeweluniqueart = any[];
    
    interface data_passiveoverridelimits_Item {
      Id?: string;
      Description?: string;
    }
    export interface data_passiveoverridelimits extends Array<data_passiveoverridelimits_Item> {}
    
    export type data_passiveskillfilteroptions = any[];
    
    export type data_passiveskillmasteryeffects = any[];
    
    interface data_passiveskillmasterygroups_Item {
      Id?: string;
      MasteryEffects?: any[];
      InactiveIcon?: string;
      ActiveIcon?: string;
      ActiveEffectImage?: string;
      Unk005?: boolean;
      SoundEffect?: data_passiveskillmasterygroups_Item_SoundEffect;
      MasteryCountStat?: data_passiveskillmasterygroups_Item_MasteryCountStat;
    }
    interface data_passiveskillmasterygroups_Item_SoundEffect {
      TableName?: string;
      Id?: string;
    }
    interface data_passiveskillmasterygroups_Item_MasteryCountStat {
      TableName?: string;
      Id?: string;
    }
    export interface data_passiveskillmasterygroups extends Array<data_passiveskillmasterygroups_Item> {}
    
    export type data_passiveskilloverrides = any[];
    
    interface data_passiveskilloverridetypes_Item {
      Id?: string;
      CounterStat?: any;
      Unk002?: boolean;
    }
    export interface data_passiveskilloverridetypes extends Array<data_passiveskilloverridetypes_Item> {}
    
    interface data_passiveskills_Item {
      Id?: string;
      Icon_DDSFile?: string;
      Stats?: any[];
      Stat1Value?: number;
      Stat2Value?: number;
      Stat3Value?: number;
      Stat4Value?: number;
      PassiveSkillGraphId?: number;
      Name?: string;
      Characters?: any[];
      IsKeystone?: boolean;
      IsNotable?: boolean;
      FlavourText?: string;
      IsJustIcon?: boolean;
      AchievementItem?: any;
      IsJewelSocket?: boolean;
      AscendancyKey?: any;
      IsAscendancyStartingNode?: boolean;
      ReminderStrings?: any[];
      SkillPointsGranted?: number;
      IsMultipleChoice?: boolean;
      IsMultipleChoiceOption?: boolean;
      Stat5Value?: number;
      PassiveSkillBuffs?: any[];
      GrantedEffectsPerLevel?: data_passiveskills_Item_GrantedEffectsPerLevel;
      IsAnointmentOnly?: boolean;
      Unk026?: number;
      IsExpansion?: boolean;
      IsProxyPassive?: boolean;
      SkillType?: number;
      MasteryGroup?: any;
      Group?: any;
      SoundEffect?: data_passiveskills_Item_SoundEffect;
      Unk033?: string;
      Unk034?: number;
      Unk035?: number;
      Unk036?: number;
      Unk037?: number;
      Unk038?: number;
      Unk039?: boolean;
      Unk040?: any[];
      Unk041?: number;
      Unk042?: any;
      Unk043?: boolean;
      Unk044?: any;
      Unk045?: any;
    }
    interface data_passiveskills_Item_GrantedEffectsPerLevel {
      TableName?: string;
      RowIndex?: number;
    }
    interface data_passiveskills_Item_SoundEffect {
      TableName?: string;
      Id?: string;
    }
    export interface data_passiveskills extends Array<data_passiveskills_Item> {}
    
    interface data_passiveskillstatcategories_Item {
      Id?: string;
      Name?: string;
    }
    export interface data_passiveskillstatcategories extends Array<data_passiveskillstatcategories_Item> {}
    
    export type data_passiveskilltrees = any[];
    
    export type data_passiveskilltreetutorial = any[];
    
    interface data_passiveskilltreeuiart_Item {
      Id?: string;
      GroupBackgroundSmall?: string;
      GroupBackgroundMedium?: string;
      GroupBackgroundLarge?: string;
      Unk004?: boolean;
      PassiveFrameNormal?: string;
      NotableFrameNormal?: string;
      KeystoneFrameNormal?: string;
      PassiveFrameActive?: string;
      NotableFrameActive?: string;
      KeystoneFrameActive?: string;
      PassiveFrameCanAllocate?: string;
      NotableFrameCanAllocate?: string;
      KeystoneCanAllocate?: string;
      Ornament?: string;
      GroupBackgroundSmallBlank?: string;
      GroupBackgroundMediumBlank?: string;
      GroupBackgroundLargeBlank?: string;
    }
    export interface data_passiveskilltreeuiart extends Array<data_passiveskilltreeuiart_Item> {}
    
    export type data_passivetreeexpansionjewels = any[];
    
    interface data_passivetreeexpansionjewelsizes_Item {
      Name?: string;
    }
    export interface data_passivetreeexpansionjewelsizes extends Array<data_passivetreeexpansionjewelsizes_Item> {}
    
    export type data_passivetreeexpansionskills = any[];
    
    export type data_passivetreeexpansionspecialskills = any[];
    
    interface data_pcbangrewardmicros_Item {
      Unk000?: data_pcbangrewardmicros_Item_Unk000;
      Unk001?: number;
    }
    interface data_pcbangrewardmicros_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_pcbangrewardmicros extends Array<data_pcbangrewardmicros_Item> {}
    
    export type data_pet = any[];
    
    interface data_playerconditions_Item {
      Id?: string;
      BuffDefinitionsKeys?: any[];
      Unk002?: boolean;
      BuffStacks?: number;
      CharactersKey?: any;
      StatsKeys?: any[];
      Unk006?: boolean;
      StatValue?: number;
      Unk008?: any[];
      Unk009?: boolean;
    }
    export interface data_playerconditions extends Array<data_playerconditions_Item> {}
    
    interface data_playertradewhisperformats_Item {
      Id?: string;
      Whisper?: string;
      InStash?: boolean;
      IsPriced?: boolean;
    }
    export interface data_playertradewhisperformats extends Array<data_playertradewhisperformats_Item> {}
    
    interface data_portalaudio_Item {
      Unk000?: data_portalaudio_Item_Unk000;
      Unk001?: data_portalaudio_Item_Unk001;
      Unk002?: data_portalaudio_Item_Unk002;
      Unk003?: number;
    }
    interface data_portalaudio_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_portalaudio_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_portalaudio_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_portalaudio extends Array<data_portalaudio_Item> {}
    
    interface data_portalaudioevents_Item {
      Id?: string;
      Unk001?: number;
    }
    export interface data_portalaudioevents extends Array<data_portalaudioevents_Item> {}
    
    interface data_preloadfromstats_Item {
      Unk000?: data_preloadfromstats_Item_Unk000;
      Unk001?: any[];
      Unk002?: any[];
      Unk003?: number[];
      Unk004?: any[];
      Unk005?: number;
    }
    interface data_preloadfromstats_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_preloadfromstats extends Array<data_preloadfromstats_Item> {}
    
    interface data_preloadgroups_Item {
      Id?: string;
    }
    export interface data_preloadgroups extends Array<data_preloadgroups_Item> {}
    
    interface data_primordialbosslifescalingperlevel_Item {
      AreaLevel?: number;
      Scale?: number;
    }
    export interface data_primordialbosslifescalingperlevel extends Array<data_primordialbosslifescalingperlevel_Item> {}
    
    export type data_projectileoverrides = any[];
    
    interface data_projectiles_Item {
      Id?: string;
      AOFiles?: string[];
      LoopAnimationIds?: string[];
      ImpactAnimationIds?: string[];
      ProjectileSpeed?: number;
      Unk005?: boolean;
      Unk006?: number;
      Unk007?: boolean;
      Unk008?: boolean;
      InheritsFrom?: string;
      Unk010?: number;
      Unk011?: any;
      Unk012?: number;
      Unk013?: boolean;
      Unk014?: boolean;
      Stuck_AOFile?: any[];
      Bounce_AOFile?: string;
      Unk017?: number;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
      Unk021?: data_projectiles_Item_Unk021;
      Unk022?: any;
      Unk023?: number;
      Unk024?: number;
      Unk025?: number;
      Unk026?: number;
      Unk027?: number;
      Unk028?: any[];
      Unk029?: boolean;
      Unk030?: any[];
      Unk031?: any;
    }
    interface data_projectiles_Item_Unk021 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_projectiles extends Array<data_projectiles_Item> {}
    
    interface data_projectilesartvariations_Item {
      Projectile?: string;
      Variant?: number;
      Unk002?: number[];
      Unk003?: number;
      Unk004?: any;
    }
    export interface data_projectilesartvariations extends Array<data_projectilesartvariations_Item> {}
    
    interface data_pvptypes_Item {
      Id?: string;
      Unk001?: any;
    }
    export interface data_pvptypes extends Array<data_pvptypes_Item> {}
    
    interface data_quest_Item {
      Id?: string;
      Act?: number;
      Name?: string;
      Icon_DDSFile?: string;
      QuestId?: number;
      Unk005?: boolean;
      Type?: data_quest_Item_Type;
      Unk007?: any[];
      Unk008?: number;
      TrackerGroup?: any;
      Unk010?: boolean;
      Unk011?: data_quest_Item_Unk011;
    }
    interface data_quest_Item_Type {
      TableName?: string;
      Id?: string;
    }
    interface data_quest_Item_Unk011 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_quest extends Array<data_quest_Item> {}
    
    interface data_questachievements_Item {
      Id?: string;
      QuestStates?: number[];
      Unk002?: any[];
      AchievementItems?: any[];
      NPCs?: any[];
      Unk005?: boolean;
    }
    export interface data_questachievements extends Array<data_questachievements_Item> {}
    
    interface data_questflags_Item {
      Id?: string;
      HASH32?: number;
    }
    export interface data_questflags extends Array<data_questflags_Item> {}
    
    export type data_questitemnpcaudio = any[];
    
    interface data_questitems_Item {
      Item?: data_questitems_Item_Item;
      HaveItemQuestFlag?: data_questitems_Item_HaveItemQuestFlag;
      UsedItemQuestFlag?: any;
      Unk003?: number;
      Unk004?: any[];
      Unk005?: boolean;
      Unk006?: boolean;
      ItemDescription?: data_questitems_Item_ItemDescription;
      ItemFunction?: data_questitems_Item_ItemFunction;
      Script?: string;
      Unk010?: any;
      Unk011?: any;
      Unk012?: number;
    }
    interface data_questitems_Item_Item {
      TableName?: string;
      Id?: string;
    }
    interface data_questitems_Item_HaveItemQuestFlag {
      TableName?: string;
      Id?: string;
    }
    interface data_questitems_Item_ItemDescription {
      TableName?: string;
      Id?: string;
    }
    interface data_questitems_Item_ItemFunction {
      TableName?: string;
      Id?: string;
    }
    export interface data_questitems extends Array<data_questitems_Item> {}
    
    interface data_questrewardoffers_Item {
      Id?: string;
      QuestKey?: data_questrewardoffers_Item_QuestKey;
      QuestFlag?: data_questrewardoffers_Item_QuestFlag;
      Unk003?: number;
      RewardWindowTake?: any;
      Unk005?: boolean;
      Unk006?: boolean;
      RewardWindowTitle?: any;
      Unk008?: boolean;
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: boolean;
      Unk012?: any;
    }
    interface data_questrewardoffers_Item_QuestKey {
      TableName?: string;
      Id?: string;
    }
    interface data_questrewardoffers_Item_QuestFlag {
      TableName?: string;
      Id?: string;
    }
    export interface data_questrewardoffers extends Array<data_questrewardoffers_Item> {}
    
    interface data_questrewards_Item {
      RewardOffer?: data_questrewards_Item_RewardOffer;
      UnkLong001?: number;
      Reward?: data_questrewards_Item_Reward;
      RewardLevel?: number;
      SomeRef01?: any;
      UnkInt002?: number;
      UnkLong003?: number;
      UnkLong004?: number;
      UnkLong005?: number;
      RewardStack?: number;
      UnkInt006?: number;
      UnkInt007?: number;
      UnkShort008?: number;
      UnkLong009?: number;
      UnkLong010?: number;
      UnkLong011?: number;
      UnkLong012?: number;
      UnkInt013?: number;
      SomeRef02?: any;
      UnkLong014?: number;
      UnkInt015?: number;
      UnkLong016?: number;
      UnkInt017?: number;
      Unk018?: boolean;
    }
    interface data_questrewards_Item_RewardOffer {
      TableName?: string;
      Id?: string;
    }
    interface data_questrewards_Item_Reward {
      TableName?: string;
      Id?: string;
    }
    export interface data_questrewards extends Array<data_questrewards_Item> {}
    
    interface data_questrewardtype_Item {
      Id?: string;
      Icon?: string;
      Name?: string;
      Description?: string;
      SomeRef?: data_questrewardtype_Item_SomeRef;
    }
    interface data_questrewardtype_Item_SomeRef {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_questrewardtype extends Array<data_questrewardtype_Item> {}
    
    interface data_queststates_Item {
      Quest?: data_queststates_Item_Quest;
      Order?: number;
      FlagsPresent?: any[];
      FlagsMissing?: any[];
      Text?: string;
      Unk005?: boolean;
      Message?: string;
      MapPinsKeys1?: any[];
    }
    interface data_queststates_Item_Quest {
      TableName?: string;
      Id?: string;
    }
    export interface data_queststates extends Array<data_queststates_Item> {}
    
    interface data_queststaticrewards_Item {
      QuestFlag?: data_queststaticrewards_Item_QuestFlag;
      Unk001?: number;
      StatsKeys?: any[];
      StatValues?: any[];
      QuestKey?: any;
      Unk005?: number;
      ClientStringsKey?: any;
      Unk007?: number;
      Unk008?: boolean;
    }
    interface data_queststaticrewards_Item_QuestFlag {
      TableName?: string;
      Id?: string;
    }
    export interface data_queststaticrewards extends Array<data_queststaticrewards_Item> {}
    
    interface data_questtrackergroup_Item {
      Id?: string;
      Name?: string;
      QuestType?: data_questtrackergroup_Item_QuestType;
    }
    interface data_questtrackergroup_Item_QuestType {
      TableName?: string;
      Id?: string;
    }
    export interface data_questtrackergroup extends Array<data_questtrackergroup_Item> {}
    
    interface data_questtype_Item {
      Id?: string;
      Unk001?: any[];
    }
    export interface data_questtype extends Array<data_questtype_Item> {}
    
    export type data_racerewardtomicro = any[];
    
    export type data_races = any[];
    
    interface data_racetimes_Item {
      RacesKey?: data_racetimes_Item_RacesKey;
      Index?: number;
      StartUNIXTime?: number;
      EndUNIXTime?: number;
    }
    interface data_racetimes_Item_RacesKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface data_racetimes extends Array<data_racetimes_Item> {}
    
    interface data_rarity_Item {
      Id?: string;
      MinMods?: number;
      MaxMods?: number;
      Unk003?: number;
      MaxPrefix?: number;
      Unk005?: number;
      MaxSuffix?: number;
      Color?: string;
    }
    export interface data_rarity extends Array<data_rarity_Item> {}
    
    interface data_realms_Item {
      Id?: string;
      Name?: string;
      Server?: string[];
      IsEnabled?: boolean;
      Server2?: any[];
      ShortName?: string;
      Unk006?: any[];
      Unk007?: data_realms_Item_Unk007;
      Unk008?: number;
      IsGammaRealm?: boolean;
      SpeedtestUrl?: string[];
    }
    interface data_realms_Item_Unk007 {
      TableName?: string;
      Id?: string;
    }
    export interface data_realms extends Array<data_realms_Item> {}
    
    interface data_recipeunlockdisplay_Item {
      RecipeId?: number;
      Description?: string;
      CraftingItemClassCategoriesKeys?: any[];
      UnlockDescription?: string;
      Rank?: number;
      UnlockArea?: any;
    }
    export interface data_recipeunlockdisplay extends Array<data_recipeunlockdisplay_Item> {}
    
    export type data_recipeunlockobjects = any[];
    
    interface data_relicinventorylayout_Item {
      Unk000?: number;
      Unk001?: number;
      Unk002?: number;
      Requirement?: string;
    }
    export interface data_relicinventorylayout extends Array<data_relicinventorylayout_Item> {}
    
    export type data_relicitemeffectvariations = any[];
    
    export type data_reservationskillsaudio = any[];
    
    export type data_resistancepenaltyperarealevel = any[];
    
    interface data_ritualbalanceperlevel_Item {
      MinLevel?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
    }
    export interface data_ritualbalanceperlevel extends Array<data_ritualbalanceperlevel_Item> {}
    
    interface data_ritualconstants_Item {
      Id?: string;
      Value?: number;
    }
    export interface data_ritualconstants extends Array<data_ritualconstants_Item> {}
    
    interface data_ritualrunetypes_Item {
      Id?: string;
      MiscAnimatedKey1?: data_ritualrunetypes_Item_MiscAnimatedKey1;
      SpawnWeight?: number;
      LevelMin?: number;
      LevelMax?: number;
      BuffDefinitionsKey?: data_ritualrunetypes_Item_BuffDefinitionsKey;
      BuffStatValues?: any[];
      SpawnPatterns?: any[];
      ModsKey?: any[];
      Unk009?: any[];
      Unk010?: number[];
      MiscAnimatedKey2?: data_ritualrunetypes_Item_MiscAnimatedKey2;
      EnvironmentsKey?: data_ritualrunetypes_Item_EnvironmentsKey;
      Unk013?: number;
      Achievements?: any[];
      Type?: string;
      Description?: string;
      DaemonSpawningDataKey?: data_ritualrunetypes_Item_DaemonSpawningDataKey;
      Unk018?: boolean;
    }
    interface data_ritualrunetypes_Item_MiscAnimatedKey1 {
      TableName?: string;
      Id?: string;
    }
    interface data_ritualrunetypes_Item_BuffDefinitionsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_ritualrunetypes_Item_MiscAnimatedKey2 {
      TableName?: string;
      Id?: string;
    }
    interface data_ritualrunetypes_Item_EnvironmentsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_ritualrunetypes_Item_DaemonSpawningDataKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_ritualrunetypes extends Array<data_ritualrunetypes_Item> {}
    
    interface data_ritualsetkillachievements_Item {
      Achievement?: data_ritualsetkillachievements_Item_Achievement;
      KillBosses?: any[];
    }
    interface data_ritualsetkillachievements_Item_Achievement {
      TableName?: string;
      Id?: string;
    }
    export interface data_ritualsetkillachievements extends Array<data_ritualsetkillachievements_Item> {}
    
    interface data_ritualspawnpatterns_Item {
      Id?: string;
      Unk001?: number;
      SpawnOrder?: string[];
      Unk003?: boolean;
    }
    export interface data_ritualspawnpatterns extends Array<data_ritualspawnpatterns_Item> {}
    
    interface data_rogueexilelifescalingperlevel_Item {
      Level?: number;
      AdditionalLife?: number;
    }
    export interface data_rogueexilelifescalingperlevel extends Array<data_rogueexilelifescalingperlevel_Item> {}
    
    export type data_rogueexiles = any[];
    
    interface data_rulesets_Item {
      Id?: string;
      Unk001?: any[];
    }
    export interface data_rulesets extends Array<data_rulesets_Item> {}
    
    interface data_runiccircles_Item {
      Unk000?: string;
      Unk001?: number;
      Unk002?: any[];
      Unk003?: number;
    }
    export interface data_runiccircles extends Array<data_runiccircles_Item> {}
    
    interface data_safehousebyocrafting_Item {
      BetrayalJobsKey?: data_safehousebyocrafting_Item_BetrayalJobsKey;
      BetrayalTargetsKey?: data_safehousebyocrafting_Item_BetrayalTargetsKey;
      Rank?: number;
      Description?: string;
      ServerCommand?: string;
      Unk005?: any[];
      Description2?: string;
      ServerCommand2?: string;
    }
    interface data_safehousebyocrafting_Item_BetrayalJobsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_safehousebyocrafting_Item_BetrayalTargetsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_safehousebyocrafting extends Array<data_safehousebyocrafting_Item> {}
    
    interface data_safehousecraftingspreecurrencies_Item {
      Id?: string;
      BaseItemTypesKey?: data_safehousecraftingspreecurrencies_Item_BaseItemTypesKey;
      HasSpecificBaseItem?: boolean;
    }
    interface data_safehousecraftingspreecurrencies_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_safehousecraftingspreecurrencies extends Array<data_safehousecraftingspreecurrencies_Item> {}
    
    interface data_safehousecraftingspreetype_Item {
      Id?: string;
      Currencies?: any[];
      CurrencyCount?: number[];
      Unk003?: any[];
      Disabled?: boolean;
      ItemClassText?: string;
      Unk006?: number;
    }
    export interface data_safehousecraftingspreetype extends Array<data_safehousecraftingspreetype_Item> {}
    
    interface data_salvageboxes_Item {
      BaseItemType?: data_salvageboxes_Item_BaseItemType;
      Id?: string;
      Unk002?: string;
    }
    interface data_salvageboxes_Item_BaseItemType {
      TableName?: string;
      RowIndex?: number;
    }
    export interface data_salvageboxes extends Array<data_salvageboxes_Item> {}
    
    interface data_sanctumairlocks_Item {
      Floor?: data_sanctumairlocks_Item_Floor;
      Unk001?: number;
      Unk002?: number[];
      Area1?: data_sanctumairlocks_Item_Area1;
      Area2?: data_sanctumairlocks_Item_Area2;
    }
    interface data_sanctumairlocks_Item_Floor {
      TableName?: string;
      Id?: string;
    }
    interface data_sanctumairlocks_Item_Area1 {
      TableName?: string;
      Id?: string;
    }
    interface data_sanctumairlocks_Item_Area2 {
      TableName?: string;
      Id?: string;
    }
    export interface data_sanctumairlocks extends Array<data_sanctumairlocks_Item> {}
    
    export type data_sanctumbalanceperlevel = any[];
    
    interface data_sanctumdefenceicons_Item {
      Id?: string;
      Stat?: data_sanctumdefenceicons_Item_Stat;
      DefenceIcon?: string;
      DefenceBrokenIcon?: string;
      BrokenStat?: any;
      Description?: string;
    }
    interface data_sanctumdefenceicons_Item_Stat {
      TableName?: string;
      Id?: string;
    }
    export interface data_sanctumdefenceicons extends Array<data_sanctumdefenceicons_Item> {}
    
    interface data_sanctumfloors_Item {
      Id?: string;
      Area?: data_sanctumfloors_Item_Area;
      Title?: data_sanctumfloors_Item_Title;
      RoomIcon?: string;
      BossIcon?: string;
      Description?: string;
      Summary?: data_sanctumfloors_Item_Summary;
      Itemised?: data_sanctumfloors_Item_Itemised;
    }
    interface data_sanctumfloors_Item_Area {
      TableName?: string;
      Id?: string;
    }
    interface data_sanctumfloors_Item_Title {
      TableName?: string;
      Id?: string;
    }
    interface data_sanctumfloors_Item_Summary {
      TableName?: string;
      Id?: string;
    }
    interface data_sanctumfloors_Item_Itemised {
      TableName?: string;
      Id?: string;
    }
    export interface data_sanctumfloors extends Array<data_sanctumfloors_Item> {}
    
    interface data_sanctumfodderlifescalingperlevel_Item {
      Level?: number;
      Unk001?: number;
    }
    export interface data_sanctumfodderlifescalingperlevel extends Array<data_sanctumfodderlifescalingperlevel_Item> {}
    
    interface data_sanctumlifescalingperlevel_Item {
      Level?: number;
      Unk001?: number;
    }
    export interface data_sanctumlifescalingperlevel extends Array<data_sanctumlifescalingperlevel_Item> {}
    
    interface data_sanctumpersistenteffectcategories_Item {
      Id?: string;
      Frame?: string;
      Popup?: string;
      Glow?: string;
      Curse?: boolean;
      Boon?: boolean;
      Icon?: string;
      Name?: string;
      Deferral?: boolean;
    }
    export interface data_sanctumpersistenteffectcategories extends Array<data_sanctumpersistenteffectcategories_Item> {}
    
    interface data_sanctumpersistenteffects_Item {
      Id?: string;
      Stats?: any[];
      StatValues?: number[];
      Name?: string;
      Icon?: string;
      Unk005?: number;
      Unk006?: boolean;
      EffectCategory?: data_sanctumpersistenteffects_Item_EffectCategory;
      NextEffect?: any;
      Unk009?: string;
      BoonDesc?: string;
      CurseDesc?: string;
      Unk012?: number;
      Unk013?: number;
      Unk014?: boolean;
      Unk015?: any[];
      Guard?: any[];
      FirstEffect?: any;
      Unk018?: number;
      Unk019?: number;
      Unk020?: boolean;
      Unk021?: boolean;
      HASH16?: number;
    }
    interface data_sanctumpersistenteffects_Item_EffectCategory {
      TableName?: string;
      Id?: string;
    }
    export interface data_sanctumpersistenteffects extends Array<data_sanctumpersistenteffects_Item> {}
    
    export type data_sanctumrewardobjects = any[];
    
    interface data_sanctumrooms_Item {
      Id?: string;
      ArmFile?: string;
      RoomType?: data_sanctumrooms_Item_RoomType;
      Script?: string;
      Floor?: data_sanctumrooms_Item_Floor;
      Area?: any;
    }
    interface data_sanctumrooms_Item_RoomType {
      TableName?: string;
      Id?: string;
    }
    interface data_sanctumrooms_Item_Floor {
      TableName?: string;
      Id?: string;
    }
    export interface data_sanctumrooms extends Array<data_sanctumrooms_Item> {}
    
    interface data_sanctumroomtypes_Item {
      Id?: string;
      Unk001?: boolean;
      Unk002?: boolean;
      Unk003?: data_sanctumroomtypes_Item_Unk003;
      Unk004?: data_sanctumroomtypes_Item_Unk004;
      Unk005?: boolean;
      Icon?: string;
      Unk007?: boolean;
      Description?: string;
      Unk009?: string[];
      Rooms?: any[];
      Unk011?: string;
      Unk012?: boolean;
    }
    interface data_sanctumroomtypes_Item_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_sanctumroomtypes_Item_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_sanctumroomtypes extends Array<data_sanctumroomtypes_Item> {}
    
    export type data_sanctumselectiondisplayoverride = any[];
    
    export type data_scarabs = any[];
    
    interface data_scoutingreports_Item {
      Id?: string;
      BaseItemType?: data_scoutingreports_Item_BaseItemType;
      MinMapTier?: number;
    }
    interface data_scoutingreports_Item_BaseItemType {
      TableName?: string;
      Id?: string;
    }
    export interface data_scoutingreports extends Array<data_scoutingreports_Item> {}
    
    interface data_sentinelcraftingcurrency_Item {
      Currency?: data_sentinelcraftingcurrency_Item_Currency;
      Type?: number;
    }
    interface data_sentinelcraftingcurrency_Item_Currency {
      TableName?: string;
      Id?: string;
    }
    export interface data_sentinelcraftingcurrency extends Array<data_sentinelcraftingcurrency_Item> {}
    
    export type data_sentineldroneinventorylayout = any[];
    
    interface data_sentinelpassives_Item {
      Id?: string;
      HASH16?: number;
      Unk002?: string;
      Unk003?: any[];
      Unk004?: any[];
      Unk005?: number;
      Unk006?: number;
      Unk007?: data_sentinelpassives_Item_Unk007;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
    }
    interface data_sentinelpassives_Item_Unk007 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_sentinelpassives extends Array<data_sentinelpassives_Item> {}
    
    interface data_sentinelpassivestats_Item {
      Unk000?: data_sentinelpassivestats_Item_Unk000;
      Unk001?: data_sentinelpassivestats_Item_Unk001;
      Unk002?: number;
    }
    interface data_sentinelpassivestats_Item_Unk000 {
      TableName?: string;
      Id?: string;
    }
    interface data_sentinelpassivestats_Item_Unk001 {
      TableName?: string;
      Id?: string;
    }
    export interface data_sentinelpassivestats extends Array<data_sentinelpassivestats_Item> {}
    
    interface data_sentinelpassivetypes_Item {
      Id?: string;
      DefaultIcon?: string;
      ActiveIcon?: string;
      DroneType?: any;
      Unk004?: number;
    }
    export interface data_sentinelpassivetypes extends Array<data_sentinelpassivetypes_Item> {}
    
    interface data_sentinelpowerexplevels_Item {
      Unk000?: number;
      Unk001?: number;
    }
    export interface data_sentinelpowerexplevels extends Array<data_sentinelpowerexplevels_Item> {}
    
    interface data_sentinelstoragelayout_Item {
      Id?: string;
      StoredItem?: data_sentinelstoragelayout_Item_StoredItem;
      DroneType?: any;
      Unk003?: boolean;
      TabIcon?: string;
      XOffset?: number;
      YOffset?: number;
      Unk007?: number;
      Unk008?: number;
      Width?: number;
      Height?: number;
      SlotSize?: number;
      Unk012?: any;
    }
    interface data_sentinelstoragelayout_Item_StoredItem {
      TableName?: string;
      Id?: string;
    }
    export interface data_sentinelstoragelayout extends Array<data_sentinelstoragelayout_Item> {}
    
    interface data_sentineltaggedmonsterstats_Item {
      TaggedStat?: data_sentineltaggedmonsterstats_Item_TaggedStat;
      Unk001?: data_sentineltaggedmonsterstats_Item_Unk001;
      Unk002?: any[];
      Unk003?: any;
      Unk004?: any;
    }
    interface data_sentineltaggedmonsterstats_Item_TaggedStat {
      TableName?: string;
      Id?: string;
    }
    interface data_sentineltaggedmonsterstats_Item_Unk001 {
      TableName?: string;
      Id?: string;
    }
    export interface data_sentineltaggedmonsterstats extends Array<data_sentineltaggedmonsterstats_Item> {}
    
    interface data_sessionquestflags_Item {
      QuestFlag?: data_sessionquestflags_Item_QuestFlag;
    }
    interface data_sessionquestflags_Item_QuestFlag {
      TableName?: string;
      Id?: string;
    }
    export interface data_sessionquestflags extends Array<data_sessionquestflags_Item> {}
    
    export type data_shaperguardians = any[];
    
    export type data_shapeshiftformclones = any[];
    
    export type data_shapeshiftforms = any[];
    
    export type data_shapeshifttransformdata = any[];
    
    interface data_shieldtypes_Item {
      BaseItemTypesKey?: data_shieldtypes_Item_BaseItemTypesKey;
      Block?: number;
    }
    interface data_shieldtypes_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_shieldtypes extends Array<data_shieldtypes_Item> {}
    
    interface data_shoptag_Item {
      Id?: string;
      Name?: string;
      IsCategory?: boolean;
      Category?: any;
      SkillGem?: any[];
    }
    export interface data_shoptag extends Array<data_shoptag_Item> {}
    
    interface data_shrines_Item {
      Id?: string;
      TimeoutInSeconds?: number;
      ChargesShared?: boolean;
      Player_ShrineBuffsKey?: data_shrines_Item_Player_ShrineBuffsKey;
      Unk004?: number;
      Unk005?: number;
      Monster_ShrineBuffsKey?: data_shrines_Item_Monster_ShrineBuffsKey;
      SummonMonster_MonsterVarietiesKey?: any;
      SummonPlayer_MonsterVarietiesKey?: any;
      Unk009?: number;
      Unk010?: number;
      ShrineSoundsKey?: data_shrines_Item_ShrineSoundsKey;
      Unk012?: boolean;
      AchievementItemsKeys?: any[];
      IsPVPOnly?: boolean;
      Unk015?: boolean;
      IsLesserShrine?: boolean;
      Description?: data_shrines_Item_Description;
      Name?: data_shrines_Item_Name;
      Unk019?: boolean;
      Unk020?: any;
      Unk021?: any[];
    }
    interface data_shrines_Item_Player_ShrineBuffsKey {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_shrines_Item_Monster_ShrineBuffsKey {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_shrines_Item_ShrineSoundsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_shrines_Item_Description {
      TableName?: string;
      Id?: string;
    }
    interface data_shrines_Item_Name {
      TableName?: string;
      Id?: string;
    }
    export interface data_shrines extends Array<data_shrines_Item> {}
    
    interface data_shrinesounds_Item {
      Id?: string;
      StereoSoundFile?: string;
      MonoSoundFile?: string;
    }
    export interface data_shrinesounds extends Array<data_shrinesounds_Item> {}
    
    interface data_shrinevisualartvariations_Item {
      Unk000?: data_shrinevisualartvariations_Item_Unk000;
      Unk001?: boolean;
      Unk002?: data_shrinevisualartvariations_Item_Unk002;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: boolean;
    }
    interface data_shrinevisualartvariations_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_shrinevisualartvariations_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_shrinevisualartvariations extends Array<data_shrinevisualartvariations_Item> {}
    
    interface data_sigildisplay_Item {
      Id?: string;
      Active_StatsKey?: data_sigildisplay_Item_Active_StatsKey;
      Inactive_StatsKey?: data_sigildisplay_Item_Inactive_StatsKey;
      DDSFile?: string;
      Inactive_ArtFile?: string;
      Active_ArtFile?: string;
      Frame_ArtFile?: string;
    }
    interface data_sigildisplay_Item_Active_StatsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_sigildisplay_Item_Inactive_StatsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_sigildisplay extends Array<data_sigildisplay_Item> {}
    
    interface data_singlegroundlaser_Item {
      Id?: number;
      Unk001?: data_singlegroundlaser_Item_Unk001;
      Unk002?: data_singlegroundlaser_Item_Unk002;
      Unk003?: number;
      Unk004?: string;
      Unk005?: boolean;
      Unk006?: number;
      Unk007?: boolean;
      Unk008?: number;
      Unk009?: number;
      Unk010?: any;
      Unk011?: any;
      Unk012?: number;
      Unk013?: boolean;
      Unk014?: number;
      Unk015?: number;
    }
    interface data_singlegroundlaser_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_singlegroundlaser_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_singlegroundlaser extends Array<data_singlegroundlaser_Item> {}
    
    interface data_skillartvariations_Item {
      Id?: string;
      Unk001?: any[];
      Unk002?: any[];
      Unk003?: any[];
      Unk004?: any[];
      Variants?: string[];
      Unk006?: any[];
      Unk007?: number[];
      Unk008?: any[];
      Unk009?: data_skillartvariations_Item_Unk009;
      Unk010?: any[];
      Unk011?: any[];
      Unk012?: any[];
    }
    interface data_skillartvariations_Item_Unk009 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_skillartvariations extends Array<data_skillartvariations_Item> {}
    
    export type data_skillcraftingdata = any[];
    
    export type data_skillevents = any[];
    
    interface data_skillgeminfo_Item {
      Id?: string;
      Description?: string;
      VideoURL1?: string;
      SkillGemsKey?: data_skillgeminfo_Item_SkillGemsKey;
      VideoURL2?: string;
      CharactersKeys?: any[];
    }
    interface data_skillgeminfo_Item_SkillGemsKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface data_skillgeminfo extends Array<data_skillgeminfo_Item> {}
    
    interface data_skillgemlevelupeffects_Item {
      Id?: string;
      Unk001?: data_skillgemlevelupeffects_Item_Unk001;
      Unk002?: data_skillgemlevelupeffects_Item_Unk002;
      Unk003?: data_skillgemlevelupeffects_Item_Unk003;
      Unk004?: data_skillgemlevelupeffects_Item_Unk004;
    }
    interface data_skillgemlevelupeffects_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_skillgemlevelupeffects_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_skillgemlevelupeffects_Item_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_skillgemlevelupeffects_Item_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_skillgemlevelupeffects extends Array<data_skillgemlevelupeffects_Item> {}
    
    interface data_skillgems_Item {
      BaseItemTypesKey?: data_skillgems_Item_BaseItemTypesKey;
      StrengthRequirementPercent?: number;
      DexterityRequirementPercent?: number;
      IntelligenceRequirementPercent?: number;
      VaalVariant_BaseItemTypesKey?: any;
      IsVaalVariant?: boolean;
      MinionGlobalSkillLevelStat?: any;
      IsSupport?: boolean;
      Unk008?: boolean;
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: boolean;
      Unk012?: boolean;
      AwakenedVariant?: any;
      RegularVariant?: any;
      Unk015?: number;
      ItemExperienceType?: data_skillgems_Item_ItemExperienceType;
      MtxSlotTypes?: any[];
      GemEffects?: any[];
    }
    interface data_skillgems_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    interface data_skillgems_Item_ItemExperienceType {
      TableName?: string;
      Id?: string;
    }
    export interface data_skillgems extends Array<data_skillgems_Item> {}
    
    export type data_skillgemsforuniquestat = any[];
    
    export type data_skillgemsupports = any[];
    
    interface data_skillminevariations_Item {
      SkillMinesKey?: number;
      Unk001?: number;
      MiscObject?: any;
    }
    export interface data_skillminevariations extends Array<data_skillminevariations_Item> {}
    
    interface data_skillmorphdisplay_Item {
      Unk000?: data_skillmorphdisplay_Item_Unk000;
      Unk001?: any[];
      DDSFiles?: string[];
      Unk003?: number;
      Unk004?: any[];
      Unk005?: number;
      Unk006?: any[];
      Unk007?: boolean;
      Unk008?: boolean;
    }
    interface data_skillmorphdisplay_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_skillmorphdisplay extends Array<data_skillmorphdisplay_Item> {}
    
    interface data_skillsurgeeffects_Item {
      GrantedEffectsKey?: data_skillsurgeeffects_Item_GrantedEffectsKey;
      Unk001?: any;
      Unk002?: boolean;
      Unk003?: boolean;
      Unk004?: boolean;
      MiscAnimated?: data_skillsurgeeffects_Item_MiscAnimated;
      Unk006?: boolean;
      Unk007?: boolean;
      Unk008?: number;
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: boolean;
      Unk012?: boolean;
    }
    interface data_skillsurgeeffects_Item_GrantedEffectsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_skillsurgeeffects_Item_MiscAnimated {
      TableName?: string;
      Id?: string;
    }
    export interface data_skillsurgeeffects extends Array<data_skillsurgeeffects_Item> {}
    
    interface data_skilltotemvariations_Item {
      SkillTotemsKey?: number;
      TotemSkinId?: number;
      MonsterVarietiesKey?: data_skilltotemvariations_Item_MonsterVarietiesKey;
    }
    interface data_skilltotemvariations_Item_MonsterVarietiesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_skilltotemvariations extends Array<data_skilltotemvariations_Item> {}
    
    interface data_skilltrapvariations_Item {
      Id?: number;
      Metadata?: string;
      MiscAnimated?: any;
    }
    export interface data_skilltrapvariations extends Array<data_skilltrapvariations_Item> {}
    
    interface data_skillweaponeffects_Item {
      Unk000?: string;
      Unk001?: data_skillweaponeffects_Item_Unk001;
      Unk002?: boolean;
      Unk003?: number;
      Unk004?: number;
    }
    interface data_skillweaponeffects_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_skillweaponeffects extends Array<data_skillweaponeffects_Item> {}
    
    export type data_socketaudioevents = any[];
    
    interface data_socketnotches_Item {
      Id?: string;
      Description?: string;
      RedSocketImage?: string;
      BlueSocketImage?: string;
      GreenSocketImage?: string;
    }
    export interface data_socketnotches extends Array<data_socketnotches_Item> {}
    
    export type data_soulcores = any[];
    
    interface data_soundeffects_Item {
      Id?: string;
      SoundFile?: string;
      SoundFile_2D?: string;
      Unk003?: boolean;
      Unk004?: string;
    }
    export interface data_soundeffects extends Array<data_soundeffects_Item> {}
    
    interface data_spawnadditionalchestsorclusters_Item {
      StatsKey?: data_spawnadditionalchestsorclusters_Item_StatsKey;
      ChestsKey?: any;
      ChestClustersKey?: data_spawnadditionalchestsorclusters_Item_ChestClustersKey;
    }
    interface data_spawnadditionalchestsorclusters_Item_StatsKey {
      TableName?: string;
      Id?: string;
    }
    interface data_spawnadditionalchestsorclusters_Item_ChestClustersKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_spawnadditionalchestsorclusters extends Array<data_spawnadditionalchestsorclusters_Item> {}
    
    interface data_spawnobject_Item {
      Unk000?: number;
      Unk001?: any[];
      Unk002?: any[];
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: boolean;
      Unk012?: string;
      Unk013?: number;
      Unk014?: boolean;
      Unk015?: number;
    }
    export interface data_spawnobject extends Array<data_spawnobject_Item> {}
    
    interface data_specialrooms_Item {
      Id?: string;
      ARMFile?: string;
    }
    export interface data_specialrooms extends Array<data_specialrooms_Item> {}
    
    interface data_specialtiles_Item {
      Id?: string;
      TDTFile?: string;
    }
    export interface data_specialtiles extends Array<data_specialtiles_Item> {}
    
    interface data_spectreoverrides_Item {
      Monster?: data_spectreoverrides_Item_Monster;
      Spectre?: any;
      Unk002?: any[];
    }
    interface data_spectreoverrides_Item_Monster {
      TableName?: string;
      Id?: string;
    }
    export interface data_spectreoverrides extends Array<data_spectreoverrides_Item> {}
    
    interface data_startingpassiveskills_Item {
      Id?: string;
      PassiveSkills?: any[];
    }
    export interface data_startingpassiveskills extends Array<data_startingpassiveskills_Item> {}
    
    interface data_stashtabaffinities_Item {
      SpecializedStash?: number;
      Name?: string;
      ShowInStashes?: number[];
    }
    export interface data_stashtabaffinities extends Array<data_stashtabaffinities_Item> {}
    
    interface data_stashtype_Item {
      Id?: string;
      StashId?: number;
      Id2?: string;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Icon?: any;
    }
    export interface data_stashtype extends Array<data_stashtype_Item> {}
    
    export type data_statconvertaltattackcontainer = any[];
    
    interface data_statdescriptionfunctions_Item {
      Id?: string;
      TranslationId?: string;
    }
    export interface data_statdescriptionfunctions extends Array<data_statdescriptionfunctions_Item> {}
    
    export type data_statistictrackingmicrotransactions = any[];
    
    export type data_statistictrackingmicrotransactionsstatistics = any[];
    
    interface data_stats_Item {
      Id?: string;
      Unk001?: boolean;
      IsLocal?: boolean;
      IsWeaponLocal?: boolean;
      Semantics?: number;
      Text?: string;
      Unk006?: boolean;
      IsVirtual?: boolean;
      MainHandAlias_StatsKey?: any;
      OffHandAlias_StatsKey?: any;
      Unk010?: boolean;
      HASH32?: number;
      BelongsActiveSkillsKey?: any[];
      Category?: data_stats_Item_Category;
      Unk014?: boolean;
      Unk015?: boolean;
      IsScalable?: boolean;
      ContextFlags?: any[];
      Unk018?: any[];
    }
    interface data_stats_Item_Category {
      TableName?: string;
      Id?: string;
    }
    export interface data_stats extends Array<data_stats_Item> {}
    
    interface data_statsaffectinggeneration_Item {
      Stat?: data_statsaffectinggeneration_Item_Stat;
      StatValue?: number;
    }
    interface data_statsaffectinggeneration_Item_Stat {
      TableName?: string;
      Id?: string;
    }
    export interface data_statsaffectinggeneration extends Array<data_statsaffectinggeneration_Item> {}
    
    interface data_statsfromskillstats_Item {
      Unk000?: data_statsfromskillstats_Item_Unk000;
      Unk001?: data_statsfromskillstats_Item_Unk001;
    }
    interface data_statsfromskillstats_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_statsfromskillstats_Item_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_statsfromskillstats extends Array<data_statsfromskillstats_Item> {}
    
    interface data_statvisuals_Item {
      Unk000?: data_statvisuals_Item_Unk000;
      EPKFiles?: string[];
      Unk002?: boolean;
    }
    interface data_statvisuals_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_statvisuals extends Array<data_statvisuals_Item> {}
    
    interface data_strongboxes_Item {
      ChestsKey?: data_strongboxes_Item_ChestsKey;
      SpawnWeight?: number;
      Unk002?: number;
      Unk003?: boolean;
      Unk004?: boolean;
      SpawnWeightIncrease?: any;
      SpawnWeightHardmode?: number;
    }
    interface data_strongboxes_Item_ChestsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_strongboxes extends Array<data_strongboxes_Item> {}
    
    interface data_suicideexplosion_Item {
      Id?: number;
      Unk001?: any;
      Unk002?: data_suicideexplosion_Item_Unk002;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: boolean;
      Unk006?: boolean;
      Unk007?: number;
      Unk008?: boolean;
    }
    interface data_suicideexplosion_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_suicideexplosion extends Array<data_suicideexplosion_Item> {}
    
    interface data_summonedspecificbarrels_Item {
      Id?: string;
      Chest?: data_summonedspecificbarrels_Item_Chest;
      Unk002?: data_summonedspecificbarrels_Item_Unk002;
      Unk003?: data_summonedspecificbarrels_Item_Unk003;
      Unk004?: any;
      Unk005?: string;
    }
    interface data_summonedspecificbarrels_Item_Chest {
      TableName?: string;
      Id?: string;
    }
    interface data_summonedspecificbarrels_Item_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_summonedspecificbarrels_Item_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_summonedspecificbarrels extends Array<data_summonedspecificbarrels_Item> {}
    
    interface data_summonedspecificmonsters_Item {
      Id?: number;
      MonsterVarietiesKey?: data_summonedspecificmonsters_Item_MonsterVarietiesKey;
      Unk002?: number;
      Unk003?: any;
      Unk004?: boolean;
      Unk005?: boolean;
      Unk006?: number;
      Unk007?: number;
      Unk008?: boolean;
      Unk009?: any;
      Unk010?: any;
      Unk011?: number;
      Unk012?: boolean;
      Unk013?: number;
      Unk014?: string;
      Unk015?: boolean;
      Unk016?: boolean;
      Unk017?: number;
    }
    interface data_summonedspecificmonsters_Item_MonsterVarietiesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_summonedspecificmonsters extends Array<data_summonedspecificmonsters_Item> {}
    
    export type data_summonedspecificmonstersondeath = any[];
    
    export type data_supportgems = any[];
    
    export type data_surgeeffectpackartvariations = any[];
    
    interface data_surgeeffects_Item {
      Id?: string;
      Unk001?: data_surgeeffects_Item_Unk001;
      Unk002?: number[];
      Unk003?: any[];
      Unk004?: string[];
    }
    interface data_surgeeffects_Item_Unk001 {
      TableName?: string;
      Id?: string;
    }
    export interface data_surgeeffects extends Array<data_surgeeffects_Item> {}
    
    interface data_surgetypes_Item {
      Id?: string;
      SurgeEffects?: any[];
      IntId?: number;
    }
    export interface data_surgetypes extends Array<data_surgetypes_Item> {}
    
    interface data_tablecharge_Item {
      Unk000?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: boolean;
      Unk004?: data_tablecharge_Item_Unk004;
      Unk005?: boolean;
      Unk006?: any[];
      Unk007?: data_tablecharge_Item_Unk007;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: boolean;
      Unk013?: boolean;
      Unk014?: any;
      Unk015?: any;
      Unk016?: number;
      Unk017?: boolean;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
      Unk021?: number;
      Unk022?: number;
      Unk023?: number;
      Unk024?: number;
      Unk025?: boolean;
      Unk026?: boolean;
      Unk027?: number;
    }
    interface data_tablecharge_Item_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_tablecharge_Item_Unk007 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_tablecharge extends Array<data_tablecharge_Item> {}
    
    interface data_tablemonsterspawners_Item {
      Metadata?: string;
      AreaLevel?: number;
      SpawnsMonsters?: any[];
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: boolean;
      Unk012?: boolean;
      Unk013?: boolean;
      Unk014?: boolean;
      Unk015?: boolean;
      Unk016?: boolean;
      Unk017?: number;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
      Unk021?: any;
      Unk022?: boolean;
      Unk023?: boolean;
      Script1?: string;
      Unk025?: boolean;
      Unk026?: boolean;
      Script2?: string;
      Unk028?: number[];
      Unk029?: number;
      Unk030?: number;
      Unk031?: number;
      Unk032?: number;
      Unk033?: number;
      Unk034?: number;
      Unk035?: number;
      Unk036?: number;
    }
    export interface data_tablemonsterspawners extends Array<data_tablemonsterspawners_Item> {}
    
    interface data_tags_Item {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
    }
    export interface data_tags extends Array<data_tags_Item> {}
    
    interface data_talismanmonstermods_Item {
      ModTypeKey?: data_talismanmonstermods_Item_ModTypeKey;
      ModsKey?: data_talismanmonstermods_Item_ModsKey;
    }
    interface data_talismanmonstermods_Item_ModTypeKey {
      TableName?: string;
      RowIndex?: number;
    }
    interface data_talismanmonstermods_Item_ModsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_talismanmonstermods extends Array<data_talismanmonstermods_Item> {}
    
    export type data_talismanpacks = any[];
    
    export type data_talismans = any[];
    
    interface data_talkingpetaudioevents_Item {
      Event?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: any[];
      Unk005?: any[];
      Unk006?: number;
    }
    export interface data_talkingpetaudioevents extends Array<data_talkingpetaudioevents_Item> {}
    
    export type data_talkingpetnpcaudio = any[];
    
    interface data_talkingpets_Item {
      Unk000?: data_talkingpets_Item_Unk000;
      Unk001?: any[];
    }
    interface data_talkingpets_Item_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_talkingpets extends Array<data_talkingpets_Item> {}
    
    interface data_tencentautolootpetcurrencies_Item {
      BaseItemTypesKey?: data_tencentautolootpetcurrencies_Item_BaseItemTypesKey;
      Unk001?: boolean;
      Unk002?: any[];
    }
    interface data_tencentautolootpetcurrencies_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_tencentautolootpetcurrencies extends Array<data_tencentautolootpetcurrencies_Item> {}
    
    interface data_tencentautolootpetcurrenciesexcludable_Item {
      BaseItemTypesKey?: data_tencentautolootpetcurrenciesexcludable_Item_BaseItemTypesKey;
    }
    interface data_tencentautolootpetcurrenciesexcludable_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_tencentautolootpetcurrenciesexcludable extends Array<data_tencentautolootpetcurrenciesexcludable_Item> {}
    
    interface data_terrainplugins_Item {
      Id?: string;
      Unk001?: number;
      Unk002?: boolean;
      Unk003?: boolean;
    }
    export interface data_terrainplugins extends Array<data_terrainplugins_Item> {}
    
    export type data_threetoonerecipes = any[];
    
    interface data_tieredmicrotransactions_Item {
      MTX?: data_tieredmicrotransactions_Item_MTX;
      TierThresholds?: number[];
      Unk002?: data_tieredmicrotransactions_Item_Unk002;
      Unk003?: any[];
      Unk004?: any;
      TierCount?: number;
      Unk006?: any[];
      Unk007?: any[];
      Unk008?: any[];
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: any;
      Unk012?: boolean;
    }
    interface data_tieredmicrotransactions_Item_MTX {
      TableName?: string;
      RowIndex?: number;
    }
    interface data_tieredmicrotransactions_Item_Unk002 {
      TableName?: string;
      Id?: string;
    }
    export interface data_tieredmicrotransactions extends Array<data_tieredmicrotransactions_Item> {}
    
    export type data_tieredmicrotransactionsvisuals = any[];
    
    interface data_tips_Item {
      Id?: string;
      Text?: string;
      TextXBox?: string;
    }
    export interface data_tips extends Array<data_tips_Item> {}
    
    interface data_topologies_Item {
      Id?: string;
      DGRFile?: string;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
    }
    export interface data_topologies extends Array<data_topologies_Item> {}
    
    export type data_tormentspirits = any[];
    
    export type data_totemdefendervarieties = any[];
    
    export type data_touchinteractiontype = any[];
    
    interface data_trademarketcategory_Item {
      Id?: string;
      Name?: string;
      StyleFlag?: number;
      Group?: data_trademarketcategory_Item_Group;
      Unk004?: number[];
      Unk005?: boolean;
      IsDisabled?: boolean;
    }
    interface data_trademarketcategory_Item_Group {
      TableName?: string;
      Id?: string;
    }
    export interface data_trademarketcategory extends Array<data_trademarketcategory_Item> {}
    
    interface data_trademarketcategorygroups_Item {
      Id?: string;
      Name?: string;
    }
    export interface data_trademarketcategorygroups extends Array<data_trademarketcategorygroups_Item> {}
    
    interface data_trademarketcategorylistallclass_Item {
      TradeCategory?: data_trademarketcategorylistallclass_Item_TradeCategory;
      ItemClass?: data_trademarketcategorylistallclass_Item_ItemClass;
    }
    interface data_trademarketcategorylistallclass_Item_TradeCategory {
      TableName?: string;
      Id?: string;
    }
    interface data_trademarketcategorylistallclass_Item_ItemClass {
      TableName?: string;
      Id?: string;
    }
    export interface data_trademarketcategorylistallclass extends Array<data_trademarketcategorylistallclass_Item> {}
    
    export type data_trademarketimplicitmoddisplay = any[];
    
    interface data_trademarketindexitemas_Item {
      Item?: data_trademarketindexitemas_Item_Item;
      IndexAs?: data_trademarketindexitemas_Item_IndexAs;
    }
    interface data_trademarketindexitemas_Item_Item {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_trademarketindexitemas_Item_IndexAs {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_trademarketindexitemas extends Array<data_trademarketindexitemas_Item> {}
    
    export type data_traptools = any[];
    
    export type data_treasurehuntermissions = any[];
    
    interface data_triggerbeam_Item {
      Unk000?: number;
      Unk001?: any[];
      Unk002?: any[];
      Unk003?: number[];
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: boolean;
      Unk010?: any[];
      Unk011?: boolean;
      Unk012?: number;
      Unk013?: boolean;
    }
    export interface data_triggerbeam extends Array<data_triggerbeam_Item> {}
    
    export type data_triggeredaudioeventvolumeoverrides = any[];
    
    export type data_triggerspawners = any[];
    
    interface data_trythenewleagueversions_Item {
      League?: string;
      Logo?: string;
    }
    export interface data_trythenewleagueversions extends Array<data_trythenewleagueversions_Item> {}
    
    interface data_tutorial_Item {
      Id?: string;
      UIFile?: string;
      ClientString?: data_tutorial_Item_ClientString;
      IsEnabled?: boolean;
      Unk004?: number;
      Unk005?: any[];
      Unk006?: data_tutorial_Item_Unk006;
      Unk007?: number;
      Unk008?: any[];
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: number;
    }
    interface data_tutorial_Item_ClientString {
      TableName?: string;
      Id?: string;
    }
    interface data_tutorial_Item_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_tutorial extends Array<data_tutorial_Item> {}
    
    export type data_ultimatumencountertypes = any[];
    
    export type data_ultimatumencountertypesserver = any[];
    
    export type data_ultimatummodifiers = any[];
    
    interface data_ultimatummodifiertypes_Item {
      Id?: string;
      Unk001?: boolean;
    }
    export interface data_ultimatummodifiertypes extends Array<data_ultimatummodifiertypes_Item> {}
    
    export type data_ultimatummonsterpackfamily = any[];
    
    export type data_ultimatumrooms = any[];
    
    export type data_ultimatumtriallength = any[];
    
    interface data_ultimatumtrialmasteraudio_Item {
      Id?: string;
      Variant?: number;
      Unk002?: number;
      Unk003?: number;
      TextAudio?: data_ultimatumtrialmasteraudio_Item_TextAudio;
      RoundsMin?: number;
      RoundsMax?: number;
    }
    interface data_ultimatumtrialmasteraudio_Item_TextAudio {
      TableName?: string;
      Id?: string;
    }
    export interface data_ultimatumtrialmasteraudio extends Array<data_ultimatumtrialmasteraudio_Item> {}
    
    export type data_ultimatumwagertypes = any[];
    
    export type data_uncutgemadditionaltiers = any[];
    
    export type data_uncutgemtiers = any[];
    
    interface data_uniquechests_Item {
      Id?: string;
      WordsKey?: data_uniquechests_Item_WordsKey;
      FlavourTextKey?: data_uniquechests_Item_FlavourTextKey;
      MinLevel?: number;
      ModsKeys?: any[];
      SpawnWeight?: number;
      Unk006?: any[];
      AOFile?: string;
      Unk008?: boolean;
      Unk009?: any[];
      AppearanceChestsKey?: any;
      ChestsKey?: data_uniquechests_Item_ChestsKey;
      Unk012?: any[];
    }
    interface data_uniquechests_Item_WordsKey {
      TableName?: string;
      Text?: string;
    }
    interface data_uniquechests_Item_FlavourTextKey {
      TableName?: string;
      Id?: string;
    }
    interface data_uniquechests_Item_ChestsKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_uniquechests extends Array<data_uniquechests_Item> {}
    
    interface data_uniquejewellimits_Item {
      JewelName?: data_uniquejewellimits_Item_JewelName;
      Limit?: number;
    }
    interface data_uniquejewellimits_Item_JewelName {
      TableName?: string;
      Text?: string;
    }
    export interface data_uniquejewellimits extends Array<data_uniquejewellimits_Item> {}
    
    export type data_uniquemaps = any[];
    
    interface data_uniquestashlayout_Item {
      WordsKey?: data_uniquestashlayout_Item_WordsKey;
      ItemVisualIdentityKey?: data_uniquestashlayout_Item_ItemVisualIdentityKey;
      UniqueStashTypesKey?: data_uniquestashlayout_Item_UniqueStashTypesKey;
      SomeRef01?: data_uniquestashlayout_Item_SomeRef01;
      ShowIfEmptyChallengeLeague?: boolean;
      ShowIfEmptyStandard?: boolean;
      RenamedVersion?: any;
      IsAlternateArt?: boolean;
    }
    interface data_uniquestashlayout_Item_WordsKey {
      TableName?: string;
      Text?: string;
    }
    interface data_uniquestashlayout_Item_ItemVisualIdentityKey {
      TableName?: string;
      Id?: string;
    }
    interface data_uniquestashlayout_Item_UniqueStashTypesKey {
      TableName?: string;
      Id?: string;
    }
    interface data_uniquestashlayout_Item_SomeRef01 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_uniquestashlayout extends Array<data_uniquestashlayout_Item> {}
    
    interface data_uniquestashtypes_Item {
      Id?: string;
      Order?: number;
      Width?: number;
      Height?: number;
      TotalCount?: number;
      Unk005?: number;
      Name?: string;
      StandardCount?: number;
      Image?: string;
      ChallengeLeagueCount?: number;
      IsDisabled?: boolean;
    }
    export interface data_uniquestashtypes extends Array<data_uniquestashtypes_Item> {}
    
    export type data_utilityflaskbuffs = any[];
    
    export type data_visualpinproperties = any[];
    
    export type data_warbandsgraph = any[];
    
    export type data_warbandsmapgraph = any[];
    
    export type data_warbandspackmonsters = any[];
    
    interface data_warbandspacknumbers_Item {
      Id?: string;
      SpawnChance?: number;
      MinLevel?: number;
      MaxLevel?: number;
      Tier4Number?: number;
      Unk005?: number;
      Tier3Number?: number;
      Unk007?: number;
      Tier2Number?: number;
      Unk009?: number;
      Tier1Number?: number;
    }
    export interface data_warbandspacknumbers extends Array<data_warbandspacknumbers_Item> {}
    
    interface data_weaponclasses_Item {
      ItemClass?: data_weaponclasses_Item_ItemClass;
      Unk001?: number;
    }
    interface data_weaponclasses_Item_ItemClass {
      TableName?: string;
      Id?: string;
    }
    export interface data_weaponclasses extends Array<data_weaponclasses_Item> {}
    
    interface data_weaponimpactsounddata_Item {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
    }
    export interface data_weaponimpactsounddata extends Array<data_weaponimpactsounddata_Item> {}
    
    export type data_weaponsoundtypes = any[];
    
    interface data_weapontypes_Item {
      BaseItemTypesKey?: data_weapontypes_Item_BaseItemTypesKey;
      Critical?: number;
      Unk02?: number;
      Unk03?: number;
      Unk04?: number;
      RangeMax?: number;
      Speed?: number;
      DamageMin?: number;
      DamageMax?: number;
      Unk009?: number;
      ReloadTime?: number;
    }
    interface data_weapontypes_Item_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface data_weapontypes extends Array<data_weapontypes_Item> {}
    
    interface data_wieldableclasses_Item {
      Unk01?: data_wieldableclasses_Item_Unk01;
      Unk02?: boolean;
      Unk03?: boolean;
      Unk04?: data_wieldableclasses_Item_Unk04;
      Unk05?: any;
      Unk06?: data_wieldableclasses_Item_Unk06;
      Unk07?: data_wieldableclasses_Item_Unk07;
      Unk08?: any;
      Unk09?: any;
      Unk10?: any;
      Unk11?: any;
      Unk12?: any;
      Unk13?: any;
      Unk14?: any;
      Unk15?: any;
      Unk16?: any;
      Unk17?: any;
      Unk18?: any;
      Unk19?: any;
      Unk20?: any;
      Unk21?: any;
      Unk22?: any;
      Unk23?: any;
      Unk24?: data_wieldableclasses_Item_Unk24;
      Unk25?: data_wieldableclasses_Item_Unk25;
      Unk26?: any;
      Unk27?: any;
      Unk28?: number;
    }
    interface data_wieldableclasses_Item_Unk01 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_wieldableclasses_Item_Unk04 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_wieldableclasses_Item_Unk06 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_wieldableclasses_Item_Unk07 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_wieldableclasses_Item_Unk24 {
      TableName?: any;
      RowIndex?: number;
    }
    interface data_wieldableclasses_Item_Unk25 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface data_wieldableclasses extends Array<data_wieldableclasses_Item> {}
    
    interface data_windowcursors_Item {
      Id?: string;
      CursorDefault?: string;
      CursorClick?: string;
      Unk003?: number;
      Unk004?: number;
      CursorHover?: string;
      Description?: string;
      IsEnabled?: boolean;
      Unk008?: number;
    }
    export interface data_windowcursors extends Array<data_windowcursors_Item> {}
    
    interface data_words_Item {
      Wordlist?: number;
      Text?: string;
      SpawnWeight_Tags?: any[];
      SpawnWeight_Values?: number[];
      Unk004?: number;
      Text2?: string;
      Inflection?: string;
    }
    export interface data_words extends Array<data_words_Item> {}
    
    export type data_worldarealeaguechances = any[];
    
    interface data_worldareas_Item {
      Id?: string;
      Name?: string;
      Act?: number;
      IsTown?: boolean;
      HasWaypoint?: boolean;
      ConnectedWorldAreas?: any[];
      AreaLevel?: number;
      UnkLong01?: number;
      UnkArray01?: any[];
      UnkRef01?: any;
      UnkArray02?: any[];
      UnkInt01?: number;
      SomehowConnectedAreasMaybe?: any[];
    }
    export interface data_worldareas extends Array<data_worldareas_Item> {}
    
    export type data_worldmaplegends = any[];
    
    interface data_worldpopupicontypes_Item {
      Id?: string;
      Unk001?: string;
      Unk002?: number;
      Unk003?: number;
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: string;
    }
    export interface data_worldpopupicontypes extends Array<data_worldpopupicontypes_Item> {}
    
    export type data_worldscreenmappindialogue = any[];
    
  }

}
